import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ResourcesModule } from './resources.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';

const NON_EXISTENT_UUID = '00000000-0000-0000-0000-000000000000';

describe('Resources Integration Tests', () => {
  let app: INestApplication;
  let repository: Repository<Resource>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ResourcesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    repository = moduleFixture.get<Repository<Resource>>(getRepositoryToken(Resource));
    await app.init();
  });

  beforeEach(async () => {
    // Nettoyer la table Resources avant chaque test
    await repository.query('TRUNCATE TABLE "Resources" CASCADE');
  });

  afterAll(async () => {
    // Nettoyer la table Resources après tous les tests
    await repository.query('TRUNCATE TABLE "Resources" CASCADE');
    await app.close();
  });

  describe('POST /resources', () => {
    it('should create a resource with valid data', async () => {
      const response = await request(app.getHttpServer())
        .post('/resources')
        .send({
          title: 'Test Resource',
          description: 'Test Description',
          content: 'Test Content',
          status: 'active',
        })
        .expect(201);

      // Vérifier que les données sont bien créées en base
      const savedResource = await repository.findOne({ 
        where: { uuid_resource: response.body.uuid_resource } 
      });
      
      expect(savedResource).toBeDefined();
      if (savedResource) {
        expect(savedResource.title).toBe('Test Resource');
        expect(savedResource.description).toBe('Test Description');
        expect(savedResource.content).toBe('Test Content');
        expect(savedResource.status).toBe('active');
      }
    });

    it('should fail to create a resource with invalid data', () => {
      return request(app.getHttpServer())
        .post('/resources')
        .send({
          title: '', // Empty title should fail validation
          description: 'Test Description',
          content: 'Test Content',
          status: 'invalid_status', // Invalid status should fail validation
        })
        .expect(400);
    });
  });

  describe('GET /resources', () => {
    it('should return an array of resources', async () => {
      // Créer quelques ressources de test
      await repository.save([
        {
          title: 'Resource 1',
          description: 'Description 1',
          content: 'Content 1',
          status: 'active',
        },
        {
          title: 'Resource 2',
          description: 'Description 2',
          content: 'Content 2',
          status: 'inactive',
        },
      ]);

      const response = await request(app.getHttpServer())
        .get('/resources')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Resource 1');
      expect(response.body[1].title).toBe('Resource 2');
    });
  });

  describe('GET /resources/:uuid', () => {
    it('should return a resource by uuid', async () => {
      // Créer une ressource de test
      const createdResource = await repository.save({
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      });

      const response = await request(app.getHttpServer())
        .get(`/resources/${createdResource.uuid_resource}`)
        .expect(200);

      expect(response.body.uuid_resource).toBe(createdResource.uuid_resource);
      expect(response.body.title).toBe('Test Resource');
    });

    it('should return 404 for non-existent resource', () => {
      return request(app.getHttpServer())
        .get(`/resources/${NON_EXISTENT_UUID}`)
        .expect(404);
    });
  });

  describe('PUT /resources/:uuid', () => {
    it('should update a resource', async () => {
      // Créer une ressource de test
      const createdResource = await repository.save({
        title: 'Original Resource',
        description: 'Original Description',
        content: 'Original Content',
        status: 'active',
      });

      await request(app.getHttpServer())
        .put(`/resources/${createdResource.uuid_resource}`)
        .send({
          title: 'Updated Resource',
          status: 'inactive',
        })
        .expect(200);

      // Vérifier que les données sont bien mises à jour en base
      const updatedResource = await repository.findOne({ 
        where: { uuid_resource: createdResource.uuid_resource } 
      });
      
      expect(updatedResource).toBeDefined();
      if (updatedResource) {
        expect(updatedResource.title).toBe('Updated Resource');
        expect(updatedResource.status).toBe('inactive');
      }
    });

    it('should return 404 for updating non-existent resource', () => {
      return request(app.getHttpServer())
        .put(`/resources/${NON_EXISTENT_UUID}`)
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });

  describe('DELETE /resources/:uuid', () => {
    it('should delete a resource', async () => {
      // Créer une ressource de test
      const createdResource = await repository.save({
        title: 'Resource to Delete',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      });

      await request(app.getHttpServer())
        .delete(`/resources/${createdResource.uuid_resource}`)
        .expect(200);

      // Vérifier que la ressource est bien supprimée
      const deletedResource = await repository.findOne({ 
        where: { uuid_resource: createdResource.uuid_resource } 
      });
      expect(deletedResource).toBeNull();
    });

    it('should return 404 for deleting non-existent resource', () => {
      return request(app.getHttpServer())
        .delete(`/resources/${NON_EXISTENT_UUID}`)
        .expect(404);
    });
  });
}); 
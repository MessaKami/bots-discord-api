import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';

describe('ResourcesService', () => {
  let service: ResourcesService;
  let repository: Repository<Resource>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Resource])
      ],
      providers: [ResourcesService],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
    repository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
  });

  beforeEach(async () => {
    // Nettoyer la table Resources avant chaque test
    await repository.query('TRUNCATE TABLE "Resources" CASCADE');
  });

  afterAll(async () => {
    // Nettoyer la table Resources après tous les tests
    await repository.query('TRUNCATE TABLE "Resources" CASCADE');
  });

  describe('create', () => {
    it('should create a resource with valid data', async () => {
      const createDto = {
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      };

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(result.uuid_resource).toBeDefined();
      expect(result.title).toBe(createDto.title);
      expect(result.description).toBe(createDto.description);
      expect(result.content).toBe(createDto.content);
      expect(result.status).toBe(createDto.status);

      // Vérifier en base de données
      const savedResource = await repository.findOne({ 
        where: { uuid_resource: result.uuid_resource } 
      });
      expect(savedResource).toBeDefined();
      expect(savedResource?.title).toBe(createDto.title);
    });
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      // Créer des ressources de test
      const resources = await repository.save([
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

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Resource 1');
      expect(result[1].title).toBe('Resource 2');
    });

    it('should return empty array when no resources exist', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a resource when it exists', async () => {
      // Créer une ressource de test
      const resource = await repository.save({
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      });

      const result = await service.findOne(resource.uuid_resource);

      expect(result).toBeDefined();
      expect(result.uuid_resource).toBe(resource.uuid_resource);
      expect(result.title).toBe(resource.title);
    });

    it('should throw NotFoundException when resource not found', async () => {
      const uuid = '00000000-0000-0000-0000-000000000000';
      await expect(service.findOne(uuid)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a resource when it exists', async () => {
      // Créer une ressource de test
      const resource = await repository.save({
        title: 'Original Resource',
        description: 'Original Description',
        content: 'Original Content',
        status: 'active',
      });

      const updateDto = {
        title: 'Updated Resource',
        status: 'inactive',
      };

      const result = await service.update(resource.uuid_resource, updateDto);

      expect(result).toBeDefined();
      expect(result.title).toBe(updateDto.title);
      expect(result.status).toBe(updateDto.status);
      expect(result.description).toBe(resource.description); // Non modifié

      // Vérifier en base de données
      const updatedResource = await repository.findOne({ 
        where: { uuid_resource: resource.uuid_resource } 
      });
      expect(updatedResource?.title).toBe(updateDto.title);
      expect(updatedResource?.status).toBe(updateDto.status);
    });

    it('should throw NotFoundException when updating non-existent resource', async () => {
      const uuid = '00000000-0000-0000-0000-000000000000';
      await expect(service.update(uuid, { title: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a resource when it exists', async () => {
      // Créer une ressource de test
      const resource = await repository.save({
        title: 'Resource to Delete',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      });

      await service.remove(resource.uuid_resource);

      // Vérifier que la ressource est supprimée
      const deletedResource = await repository.findOne({ 
        where: { uuid_resource: resource.uuid_resource } 
      });
      expect(deletedResource).toBeNull();
    });

    it('should throw NotFoundException when deleting non-existent resource', async () => {
      const uuid = '00000000-0000-0000-0000-000000000000';
      await expect(service.remove(uuid)).rejects.toThrow(NotFoundException);
    });
  });
}); 
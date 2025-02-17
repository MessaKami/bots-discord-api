import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ReportsModule } from './reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report, ReportCategory } from './entities/report.entity';
import { Repository } from 'typeorm';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';

describe('Reports Integration Tests', () => {
  let app: INestApplication;
  let repository: Repository<Report>;
  const NON_EXISTENT_UUID = '00000000-0000-0000-0000-000000000000';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ReportsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    repository = moduleFixture.get<Repository<Report>>(getRepositoryToken(Report));
    await app.init();
  });

  beforeEach(async () => {
    // Nettoyer la table Reports avant chaque test
    await repository.query('TRUNCATE TABLE "Reports" CASCADE');
  });

  afterAll(async () => {
    // Nettoyer la table Reports après tous les tests
    await repository.query('TRUNCATE TABLE "Reports" CASCADE');
    await app.close();
  });

  describe('POST /reports', () => {
    it('should create a report with valid data', async () => {
      const response = await request(app.getHttpServer())
        .post('/reports')
        .send({
          category: ReportCategory.SPAM,
          reason: 'Test Reason',
          status: 'pending',
        })
        .expect(201);

      // Vérifier que les données sont bien créées en base
      const savedReport = await repository.findOne({ 
        where: { uuid_report: response.body.uuid_report } 
      });
      
      expect(savedReport).toBeDefined();
      if (savedReport) {
        expect(savedReport.category).toBe(ReportCategory.SPAM);
        expect(savedReport.reason).toBe('Test Reason');
        expect(savedReport.status).toBe('pending');
      }
    });

    it('should fail to create a report with invalid data', () => {
      return request(app.getHttpServer())
        .post('/reports')
        .send({
          category: 'invalid_category',
          reason: '',
          status: 'pending',
        })
        .expect(400);
    });
  });

  describe('GET /reports', () => {
    it('should return an array of reports', async () => {
      // Créer quelques rapports de test
      await repository.save([
        {
          category: ReportCategory.SPAM,
          reason: 'Reason 1',
          status: 'pending',
        },
        {
          category: ReportCategory.HARASSMENT,
          reason: 'Reason 2',
          status: 'resolved',
        },
      ]);

      const response = await request(app.getHttpServer())
        .get('/reports')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].reason).toBe('Reason 1');
      expect(response.body[1].reason).toBe('Reason 2');
    });
  });

  describe('GET /reports/:uuid', () => {
    it('should return a report by uuid', async () => {
      // Créer un rapport de test
      const createdReport = await repository.save({
        category: ReportCategory.SPAM,
        reason: 'Test Reason',
        status: 'pending',
      });

      const response = await request(app.getHttpServer())
        .get(`/reports/${createdReport.uuid_report}`)
        .expect(200);

      expect(response.body.uuid_report).toBe(createdReport.uuid_report);
      expect(response.body.reason).toBe('Test Reason');
    });

    it('should return 404 for non-existent report', () => {
      return request(app.getHttpServer())
        .get(`/reports/${NON_EXISTENT_UUID}`)
        .expect(404);
    });
  });

  describe('PUT /reports/:uuid', () => {
    it('should update a report', async () => {
      // Créer un rapport de test
      const createdReport = await repository.save({
        category: ReportCategory.SPAM,
        reason: 'Original Reason',
        status: 'pending',
      });

      await request(app.getHttpServer())
        .put(`/reports/${createdReport.uuid_report}`)
        .send({
          status: 'resolved',
          reason: 'Updated Reason',
        })
        .expect(200);

      // Vérifier que les données sont bien mises à jour en base
      const updatedReport = await repository.findOne({ 
        where: { uuid_report: createdReport.uuid_report } 
      });
      
      expect(updatedReport).toBeDefined();
      if (updatedReport) {
        expect(updatedReport.status).toBe('resolved');
        expect(updatedReport.reason).toBe('Updated Reason');
      }
    });

    it('should return 404 for updating non-existent report', () => {
      return request(app.getHttpServer())
        .put(`/reports/${NON_EXISTENT_UUID}`)
        .send({ reason: 'Updated Reason' })
        .expect(404);
    });
  });

  describe('DELETE /reports/:uuid', () => {
    it('should delete a report', async () => {
      // Créer un rapport de test
      const createdReport = await repository.save({
        category: ReportCategory.SPAM,
        reason: 'Test Reason',
        status: 'pending',
      });

      await request(app.getHttpServer())
        .delete(`/reports/${createdReport.uuid_report}`)
        .expect(200);

      // Vérifier que le rapport est bien supprimé
      const deletedReport = await repository.findOne({ 
        where: { uuid_report: createdReport.uuid_report } 
      });
      expect(deletedReport).toBeNull();
    });

    it('should return 404 for deleting non-existent report', () => {
      return request(app.getHttpServer())
        .delete(`/reports/${NON_EXISTENT_UUID}`)
        .expect(404);
    });
  });
}); 
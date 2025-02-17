import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports.module';
import { Report, ReportCategory } from './entities/report.entity';
import supertest from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Reports Integration Tests', () => {
  let app: INestApplication;
  let createdReportUuid: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'discord_bot',
          entities: [Report],
          synchronize: true,
        }),
        ReportsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /reports', () => {
    it('should create a report with valid data', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/reports')
        .send({
          category: ReportCategory.SPAM,
          reason: 'Test reason',
          status: 'pending',
        })
        .expect(201);

      expect(response.body).toHaveProperty('uuid_report');
      expect(response.body.category).toBe(ReportCategory.SPAM);
      expect(response.body.reason).toBe('Test reason');
      expect(response.body.status).toBe('pending');
      expect(response.body.created_at).toBeDefined();
      expect(response.body.updated_at).toBeDefined();

      createdReportUuid = response.body.uuid_report;
    });

    it('should reject invalid category', () => {
      return supertest(app.getHttpServer())
        .post('/reports')
        .send({
          category: 'invalid',
          reason: 'Test reason',
          status: 'pending',
        })
        .expect(400);
    });

    it('should reject reason > 50 chars', () => {
      return supertest(app.getHttpServer())
        .post('/reports')
        .send({
          category: ReportCategory.SPAM,
          reason: 'a'.repeat(51),
          status: 'pending',
        })
        .expect(400);
    });
  });

  describe('GET /reports', () => {
    it('should return array of reports', () => {
      return supertest(app.getHttpServer())
        .get('/reports')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /reports/:uuid', () => {
    it('should return a report by uuid', () => {
      return supertest(app.getHttpServer())
        .get(`/reports/${createdReportUuid}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.uuid_report).toBe(createdReportUuid);
        });
    });

    it('should return 404 for non-existent report', () => {
      return supertest(app.getHttpServer())
        .get('/reports/non-existent-uuid')
        .expect(404);
    });
  });

  describe('PUT /reports/:uuid', () => {
    it('should update a report', async () => {
      const response = await supertest(app.getHttpServer())
        .put(`/reports/${createdReportUuid}`)
        .send({
          status: 'resolved',
          reason: 'Updated reason',
        })
        .expect(200);

      expect(response.body.status).toBe('resolved');
      expect(response.body.reason).toBe('Updated reason');
      expect(response.body.updated_at).toBeDefined();
      expect(new Date(response.body.updated_at).getTime()).toBeGreaterThan(new Date(response.body.created_at).getTime());
    });

    it('should handle partial updates', async () => {
      const response = await supertest(app.getHttpServer())
        .put(`/reports/${createdReportUuid}`)
        .send({
          status: 'pending',
        })
        .expect(200);

      expect(response.body.status).toBe('pending');
      expect(response.body.reason).toBe('Updated reason');
    });
  });

  describe('DELETE /reports/:uuid', () => {
    it('should delete a report', async () => {
      await supertest(app.getHttpServer())
        .delete(`/reports/${createdReportUuid}`)
        .expect(200);

      // Verify deletion
      await supertest(app.getHttpServer())
        .get(`/reports/${createdReportUuid}`)
        .expect(404);
    });

    it('should return 404 for non-existent report', () => {
      return supertest(app.getHttpServer())
        .delete('/reports/non-existent-uuid')
        .expect(404);
    });
  });
}); 
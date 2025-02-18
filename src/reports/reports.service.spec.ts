import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsService } from './reports.service';
import { Report, ReportCategory } from './entities/report.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ReportsService', () => {
  let service: ReportsService;
  let repository: Repository<Report>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    repository = module.get<Repository<Report>>(getRepositoryToken(Report));

    // Reset all mocks after each test
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a report', async () => {
      const createDto = {
        category: ReportCategory.SPAM,
        reason: 'Test Reason',
        status: 'pending',
      };
      const report = { uuid_report: 'test-uuid', ...createDto };

      mockRepository.create.mockReturnValue(report);
      mockRepository.save.mockResolvedValue(report);

      const result = await service.create(createDto);
      expect(result).toEqual(report);
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(report);
    });

    it('should handle database errors during creation', async () => {
      const createDto = {
        category: ReportCategory.SPAM,
        reason: 'Test Reason',
        status: 'pending',
      };

      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports = [
        { uuid_report: 'uuid1', category: ReportCategory.SPAM },
        { uuid_report: 'uuid2', category: ReportCategory.HARASSMENT },
      ];
      mockRepository.find.mockResolvedValue(reports);

      const result = await service.findAll();
      expect(result).toEqual(reports);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should return empty array when no reports exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a report', async () => {
      const report = { 
        uuid_report: 'test-uuid', 
        category: ReportCategory.SPAM,
        reason: 'Test Reason',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      };
      mockRepository.findOne.mockResolvedValue(report);

      const result = await service.findOne('test-uuid');
      expect(result).toEqual(report);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { uuid_report: 'test-uuid' }
      });
    });

    it('should throw NotFoundException when report not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('test-uuid')).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { uuid_report: 'test-uuid' }
      });
    });
  });

  describe('update', () => {
    it('should update a report', async () => {
      const updateDto = { status: 'resolved' };
      const existingReport = { 
        uuid_report: 'test-uuid', 
        category: ReportCategory.SPAM,
        reason: 'Old reason',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      };
      const updatedReport = { ...existingReport, ...updateDto };

      mockRepository.findOne.mockResolvedValue(existingReport);
      mockRepository.save.mockResolvedValue(updatedReport);

      const result = await service.update('test-uuid', updateDto);
      expect(result).toEqual(updatedReport);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { uuid_report: 'test-uuid' }
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedReport);
    });

    it('should throw NotFoundException when report to update not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('test-uuid', {})).rejects.toThrow(NotFoundException);
    });

    it('should handle database errors during update', async () => {
      const existingReport = { 
        uuid_report: 'test-uuid', 
        category: ReportCategory.SPAM,
        reason: 'Test reason',
        status: 'pending'
      };

      mockRepository.findOne.mockResolvedValue(existingReport);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.update('test-uuid', { status: 'resolved' })).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a report', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove('test-uuid')).resolves.not.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledWith({ uuid_report: 'test-uuid' });
    });

    it('should throw NotFoundException when report to delete not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('test-uuid')).rejects.toThrow(NotFoundException);
    });

    it('should handle database errors during deletion', async () => {
      mockRepository.delete.mockRejectedValue(new Error('Database error'));

      await expect(service.remove('test-uuid')).rejects.toThrow();
    });
  });
}); 
import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportCategory } from './entities/report.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  const mockReportsService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);

    // Reset all mocks after each test
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const validCreateDto: CreateReportDto = {
      category: ReportCategory.SPAM,
      reason: 'Test Reason',
      status: 'pending',
    };

    it('should create a report with valid data', async () => {
      const report = { uuid_report: 'test-uuid', ...validCreateDto };
      mockReportsService.create.mockResolvedValue(report);

      const result = await controller.create(validCreateDto);
      expect(result).toEqual(report);
      expect(service.create).toHaveBeenCalledWith(validCreateDto);
    });

    it('should handle service errors during creation', async () => {
      mockReportsService.create.mockRejectedValue(new Error('Service error'));

      await expect(controller.create(validCreateDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports = [
        { 
          uuid_report: 'uuid1', 
          category: ReportCategory.SPAM,
          reason: 'Spam content',
          status: 'pending',
          created_at: new Date(),
          updated_at: new Date()
        },
        { 
          uuid_report: 'uuid2', 
          category: ReportCategory.HARASSMENT,
          reason: 'Harassment content',
          status: 'resolved',
          created_at: new Date(),
          updated_at: new Date()
        },
      ];
      mockReportsService.findAll.mockResolvedValue(reports);

      const result = await controller.findAll();
      expect(result).toEqual(reports);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockReportsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const uuid = 'test-uuid';
    const mockReport = { 
      uuid_report: uuid, 
      category: ReportCategory.SPAM,
      reason: 'Test reason',
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    };

    it('should return a report when it exists', async () => {
      mockReportsService.findOne.mockResolvedValue(mockReport);

      const result = await controller.findOne(uuid);
      expect(result).toEqual(mockReport);
      expect(service.findOne).toHaveBeenCalledWith(uuid);
    });

    it('should throw NotFoundException when report not found', async () => {
      mockReportsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(uuid)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(uuid);
    });
  });

  describe('update', () => {
    const uuid = 'test-uuid';
    const updateDto = { 
      status: 'resolved',
      reason: 'Updated reason'
    };

    it('should update a report when it exists', async () => {
      const updatedReport = {
        uuid_report: uuid,
        category: ReportCategory.SPAM,
        ...updateDto,
        created_at: new Date(),
        updated_at: new Date()
      };
      mockReportsService.update.mockResolvedValue(updatedReport);

      const result = await controller.update(uuid, updateDto);
      expect(result).toEqual(updatedReport);
      expect(service.update).toHaveBeenCalledWith(uuid, updateDto);
    });

    it('should throw NotFoundException when report to update not found', async () => {
      mockReportsService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(uuid, updateDto)).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(uuid, updateDto);
    });

    it('should handle service errors during update', async () => {
      mockReportsService.update.mockRejectedValue(new Error('Service error'));

      await expect(controller.update(uuid, updateDto)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    const uuid = 'test-uuid';

    it('should remove a report when it exists', async () => {
      mockReportsService.remove.mockResolvedValue(undefined);

      await controller.remove(uuid);
      expect(service.remove).toHaveBeenCalledWith(uuid);
    });

    it('should throw NotFoundException when report to delete not found', async () => {
      mockReportsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(uuid)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(uuid);
    });

    it('should handle service errors during deletion', async () => {
      mockReportsService.remove.mockRejectedValue(new Error('Service error'));

      await expect(controller.remove(uuid)).rejects.toThrow();
    });
  });
}); 
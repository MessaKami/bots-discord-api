import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ResourcesService', () => {
  let service: ResourcesService;
  let repository: Repository<Resource>;

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
        ResourcesService,
        {
          provide: getRepositoryToken(Resource),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
    repository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a resource', async () => {
      const createDto = {
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      };
      const resource = { uuid_resource: 'uuid', ...createDto };

      mockRepository.create.mockReturnValue(resource);
      mockRepository.save.mockResolvedValue(resource);

      const result = await service.create(createDto);
      expect(result).toEqual(resource);
    });
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      const resources = [
        { uuid_resource: 'uuid1', title: 'Resource 1' },
        { uuid_resource: 'uuid2', title: 'Resource 2' },
      ];
      mockRepository.find.mockResolvedValue(resources);

      const result = await service.findAll();
      expect(result).toEqual(resources);
    });
  });

  describe('findOne', () => {
    it('should return a resource', async () => {
      const resource = { uuid_resource: 'uuid', title: 'Resource' };
      mockRepository.findOne.mockResolvedValue(resource);

      const result = await service.findOne('uuid');
      expect(result).toEqual(resource);
    });

    it('should throw NotFoundException when resource not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('uuid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a resource', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove('uuid')).resolves.not.toThrow();
    });

    it('should throw NotFoundException when resource not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('uuid')).rejects.toThrow(NotFoundException);
    });
  });
}); 
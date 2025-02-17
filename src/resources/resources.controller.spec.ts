import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ResourcesController', () => {
  let controller: ResourcesController;
  let service: ResourcesService;

  const mockResourcesService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourcesService,
          useValue: mockResourcesService,
        },
      ],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
    service = module.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a resource', async () => {
      const createDto: CreateResourceDto = {
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
      };
      const resource = { uuid_resource: 'uuid', ...createDto };

      mockResourcesService.create.mockResolvedValue(resource);

      const result = await controller.create(createDto);
      expect(result).toEqual(resource);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      const resources = [
        { uuid_resource: 'uuid1', title: 'Resource 1' },
        { uuid_resource: 'uuid2', title: 'Resource 2' },
      ];
      mockResourcesService.findAll.mockResolvedValue(resources);

      const result = await controller.findAll();
      expect(result).toEqual(resources);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a resource', async () => {
      const resource = { uuid_resource: 'uuid', title: 'Resource' };
      mockResourcesService.findOne.mockResolvedValue(resource);

      const result = await controller.findOne('uuid');
      expect(result).toEqual(resource);
      expect(service.findOne).toHaveBeenCalledWith('uuid');
    });

    it('should throw NotFoundException when resource not found', async () => {
      mockResourcesService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('uuid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a resource', async () => {
      const updateDto = { title: 'Updated Resource' };
      const resource = { uuid_resource: 'uuid', ...updateDto };
      mockResourcesService.update.mockResolvedValue(resource);

      const result = await controller.update('uuid', updateDto);
      expect(result).toEqual(resource);
      expect(service.update).toHaveBeenCalledWith('uuid', updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a resource', async () => {
      mockResourcesService.remove.mockResolvedValue(undefined);

      await controller.remove('uuid');
      expect(service.remove).toHaveBeenCalledWith('uuid');
    });
  });
}); 
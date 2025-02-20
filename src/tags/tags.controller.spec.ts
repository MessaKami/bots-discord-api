import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;

  const mockTag = {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Tag',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTagsService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: mockTagsService,
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un nouveau tag', async () => {
      const createTagDto: CreateTagDto = {
        name: 'Test Tag',
        description: 'Test Description',
      };

      mockTagsService.create.mockResolvedValue(mockTag);

      const result = await controller.create(createTagDto);

      expect(result).toEqual(mockTag);
      expect(mockTagsService.create).toHaveBeenCalledWith(createTagDto);
    });

    it('devrait propager l\'erreur de conflit', async () => {
      const createTagDto: CreateTagDto = {
        name: 'Test Tag',
        description: 'Test Description',
      };

      mockTagsService.create.mockRejectedValue(new ConflictException());

      await expect(controller.create(createTagDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de tags', async () => {
      mockTagsService.findAll.mockResolvedValue([mockTag]);

      const result = await controller.findAll();

      expect(result).toEqual([mockTag]);
      expect(mockTagsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un tag par son uuid', async () => {
      mockTagsService.findOne.mockResolvedValue(mockTag);

      const result = await controller.findOne(mockTag.uuid);

      expect(result).toEqual(mockTag);
      expect(mockTagsService.findOne).toHaveBeenCalledWith(mockTag.uuid);
    });

    it('devrait propager l\'erreur si le tag n\'existe pas', async () => {
      mockTagsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un tag', async () => {
      const updateTagDto: UpdateTagDto = {
        name: 'Updated Tag',
      };

      mockTagsService.update.mockResolvedValue({ ...mockTag, ...updateTagDto });

      const result = await controller.update(mockTag.uuid, updateTagDto);

      expect(result).toEqual({ ...mockTag, ...updateTagDto });
      expect(mockTagsService.update).toHaveBeenCalledWith(mockTag.uuid, updateTagDto);
    });

    it('devrait propager l\'erreur si le tag n\'existe pas', async () => {
      mockTagsService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update('non-existent-id', {})).rejects.toThrow(NotFoundException);
    });

    it('devrait propager l\'erreur de conflit', async () => {
      mockTagsService.update.mockRejectedValue(new ConflictException());

      await expect(controller.update(mockTag.uuid, { name: 'Existing Tag' })).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un tag', async () => {
      mockTagsService.remove.mockResolvedValue(undefined);

      await controller.remove(mockTag.uuid);

      expect(mockTagsService.remove).toHaveBeenCalledWith(mockTag.uuid);
    });

    it('devrait propager l\'erreur si le tag n\'existe pas', async () => {
      mockTagsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
}); 
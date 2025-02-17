import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildsTemplatesService } from './guilds-templates.service';
import { GuildTemplate } from './entities/guild-template.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('GuildsTemplatesService', () => {
  let service: GuildsTemplatesService;
  let repository: Repository<GuildTemplate>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GuildsTemplatesService,
        {
          provide: getRepositoryToken(GuildTemplate),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GuildsTemplatesService>(GuildsTemplatesService);
    repository = module.get<Repository<GuildTemplate>>(getRepositoryToken(GuildTemplate));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new guild template', async () => {
      const createDto = {
        uuid: '123456789012345678',
        name: 'Test Template',
        description: 'Test Description',
        configuration: {
          welcomeChannel: '123456789',
          prefix: '!',
          language: 'fr'
        }
      };

      const newTemplate = { ...createDto, id: 1 };
      mockRepository.create.mockReturnValue(newTemplate);
      mockRepository.save.mockResolvedValue(newTemplate);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(newTemplate);
      expect(result).toEqual(newTemplate);
    });
  });

  describe('findAll', () => {
    it('should return an array of guild templates', async () => {
      const templates = [
        { id: 1, name: 'Template 1' },
        { id: 2, name: 'Template 2' },
      ];
      mockRepository.find.mockResolvedValue(templates);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(templates);
    });
  });

  describe('findOne', () => {
    it('should return a guild template by uuid', async () => {
      const template = { id: 1, name: 'Template 1' };
      const uuid = '123456789012345678';
      mockRepository.findOneBy.mockResolvedValue(template);

      const result = await service.findOne(uuid);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid });
      expect(result).toEqual(template);
    });
  });

  describe('update', () => {
    it('should update a guild template', async () => {
      const uuid = '123456789012345678';
      const updateDto = { name: 'Updated Template' };
      const existingTemplate = { id: 1, name: 'Old Template' };
      const updatedTemplate = { ...existingTemplate, ...updateDto };

      mockRepository.findOneBy.mockResolvedValue(existingTemplate);
      mockRepository.save.mockResolvedValue(updatedTemplate);

      const result = await service.update(uuid, updateDto);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedTemplate);
      expect(result).toEqual(updatedTemplate);
    });

    it('should return null if template not found', async () => {
      const uuid = '123456789012345678';
      const updateDto = { name: 'Updated Template' };
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.update(uuid, updateDto);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete a guild template', async () => {
      const uuid = '123456789012345678';
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(uuid);

      expect(mockRepository.delete).toHaveBeenCalledWith({ uuid });
    });
  });
});

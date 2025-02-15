import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModeratorActionsService } from './moderator-actions.service';
import { ModeratorAction } from './entities/moderator-action.entity';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';
import { ActionType } from './dto/create-moderator-action.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ModeratorActionsService', () => {
  let service: ModeratorActionsService;
  let repository: Repository<ModeratorAction>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModeratorActionsService,
        {
          provide: getRepositoryToken(ModeratorAction),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ModeratorActionsService>(ModeratorActionsService);
    repository = module.get<Repository<ModeratorAction>>(getRepositoryToken(ModeratorAction));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockModeratorAction = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    userId: '123e4567-e89b-12d3-a456-426614174001',
    actionType: ActionType.BAN,
    reason: 'Test reason for moderation action',
    duration: '24h',
    notes: 'Test notes',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('create', () => {
    it('should create a new moderator action', async () => {
      const createDto: CreateModeratorActionDto = {
        userId: mockModeratorAction.userId,
        actionType: mockModeratorAction.actionType,
        reason: mockModeratorAction.reason,
        duration: mockModeratorAction.duration,
        notes: mockModeratorAction.notes,
      };

      mockRepository.create.mockReturnValue(mockModeratorAction);
      mockRepository.save.mockResolvedValue(mockModeratorAction);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(mockModeratorAction);
    });

    it('should throw BadRequestException when creation fails', async () => {
      const createDto: CreateModeratorActionDto = {
        userId: mockModeratorAction.userId,
        actionType: mockModeratorAction.actionType,
        reason: mockModeratorAction.reason,
      };

      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of moderator actions', async () => {
      const mockActions = [mockModeratorAction];
      mockRepository.find.mockResolvedValue(mockActions);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(mockActions);
    });

    it('should throw BadRequestException when find fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a moderator action by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockModeratorAction);

      const result = await service.findOne(mockModeratorAction.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockModeratorAction.id },
      });
      expect(result).toEqual(mockModeratorAction);
    });

    it('should throw NotFoundException when action is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto: UpdateModeratorActionDto = {
      reason: 'Updated reason',
    };

    it('should update a moderator action', async () => {
      const updatedAction = { ...mockModeratorAction, ...updateDto };
      mockRepository.findOne.mockResolvedValue(mockModeratorAction);
      mockRepository.save.mockResolvedValue(updatedAction);

      const result = await service.update(mockModeratorAction.id, updateDto);

      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedAction);
    });

    it('should throw NotFoundException when action to update is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a moderator action', async () => {
      mockRepository.findOne.mockResolvedValue(mockModeratorAction);
      mockRepository.remove.mockResolvedValue(mockModeratorAction);

      await service.remove(mockModeratorAction.id);

      expect(repository.remove).toHaveBeenCalledWith(mockModeratorAction);
    });

    it('should throw NotFoundException when action to remove is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
});

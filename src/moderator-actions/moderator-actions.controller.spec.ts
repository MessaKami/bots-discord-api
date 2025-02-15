import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorActionsController } from './moderator-actions.controller';
import { ModeratorActionsService } from './moderator-actions.service';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';
import { ActionType } from './dto/create-moderator-action.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ModeratorActionsController', () => {
  let controller: ModeratorActionsController;
  let service: ModeratorActionsService;

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

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeratorActionsController],
      providers: [
        {
          provide: ModeratorActionsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ModeratorActionsController>(ModeratorActionsController);
    service = module.get<ModeratorActionsService>(ModeratorActionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new moderator action', async () => {
      const createDto: CreateModeratorActionDto = {
        userId: mockModeratorAction.userId,
        actionType: mockModeratorAction.actionType,
        reason: mockModeratorAction.reason,
        duration: mockModeratorAction.duration,
        notes: mockModeratorAction.notes,
      };

      mockService.create.mockResolvedValue(mockModeratorAction);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        statusCode: 201,
        message: 'Action de modération créée avec succès',
        data: mockModeratorAction,
      });
    });

    it('should handle creation errors', async () => {
      const createDto: CreateModeratorActionDto = {
        userId: mockModeratorAction.userId,
        actionType: mockModeratorAction.actionType,
        reason: mockModeratorAction.reason,
      };

      mockService.create.mockRejectedValue(new BadRequestException());

      await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of moderator actions', async () => {
      const mockActions = [mockModeratorAction];
      mockService.findAll.mockResolvedValue(mockActions);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: 200,
        data: mockActions,
      });
    });
  });

  describe('findOne', () => {
    it('should return a moderator action by id', async () => {
      mockService.findOne.mockResolvedValue(mockModeratorAction);

      const result = await controller.findOne(mockModeratorAction.id);

      expect(service.findOne).toHaveBeenCalledWith(mockModeratorAction.id);
      expect(result).toEqual({
        statusCode: 200,
        data: mockModeratorAction,
      });
    });

    it('should handle not found errors', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto: UpdateModeratorActionDto = {
      reason: 'Updated reason',
    };

    it('should update a moderator action', async () => {
      const updatedAction = { ...mockModeratorAction, ...updateDto };
      mockService.update.mockResolvedValue(updatedAction);

      const result = await controller.update(mockModeratorAction.id, updateDto);

      expect(service.update).toHaveBeenCalledWith(mockModeratorAction.id, updateDto);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Action de modération mise à jour avec succès',
        data: updatedAction,
      });
    });

    it('should handle update errors', async () => {
      mockService.update.mockRejectedValue(new NotFoundException());

      await expect(
        controller.update('non-existent-id', updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a moderator action', async () => {
      mockService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(mockModeratorAction.id);

      expect(service.remove).toHaveBeenCalledWith(mockModeratorAction.id);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Action de modération supprimée avec succès',
      });
    });

    it('should handle removal errors', async () => {
      mockService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
});

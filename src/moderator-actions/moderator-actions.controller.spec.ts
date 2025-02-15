import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorActionsController } from './moderator-actions.controller';
import { ModeratorActionsService } from './moderator-actions.service';

describe('ModeratorActionsController', () => {
  let controller: ModeratorActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeratorActionsController],
      providers: [ModeratorActionsService],
    }).compile();

    controller = module.get<ModeratorActionsController>(ModeratorActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

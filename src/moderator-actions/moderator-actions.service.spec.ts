import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorActionsService } from './moderator-actions.service';

describe('ModeratorActionsService', () => {
  let service: ModeratorActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModeratorActionsService],
    }).compile();

    service = module.get<ModeratorActionsService>(ModeratorActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

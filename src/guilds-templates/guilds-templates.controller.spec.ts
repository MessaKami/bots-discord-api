import { Test, TestingModule } from '@nestjs/testing';
import { GuildsTemplatesController } from './guilds-templates.controller';
import { GuildsTemplatesService } from './guilds-templates.service';

describe('GuildsTemplatesController', () => {
  let controller: GuildsTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuildsTemplatesController],
      providers: [GuildsTemplatesService],
    }).compile();

    controller = module.get<GuildsTemplatesController>(GuildsTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

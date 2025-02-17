import { Test, TestingModule } from '@nestjs/testing';
import { GuildsTemplatesService } from './guilds-templates.service';

describe('GuildsTemplatesService', () => {
  let service: GuildsTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildsTemplatesService],
    }).compile();

    service = module.get<GuildsTemplatesService>(GuildsTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

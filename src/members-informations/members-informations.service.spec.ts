import { Test, TestingModule } from '@nestjs/testing';
import { MembersInformationsService } from './members-informations.service';

describe('MemberInformationsService', () => {
  let service: MembersInformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersInformationsService],
    }).compile();

    service = module.get<MembersInformationsService>(MembersInformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

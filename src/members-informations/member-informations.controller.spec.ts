import { Test, TestingModule } from '@nestjs/testing';
import { MembersInformationsController } from './members-informations.controller';
import { MembersInformationsService } from './members-informations.service';

describe('MemberInformationsController', () => {
  let controller: MembersInformationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersInformationsController],
      providers: [MembersInformationsService],
    }).compile();

    controller = module.get<MembersInformationsController>(MembersInformationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

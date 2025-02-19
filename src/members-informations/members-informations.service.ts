import { Injectable } from '@nestjs/common';
import { CreateMemberInformationsDto } from './dto/create-member-informations.dto';
import { UpdateMemberInformationsDto } from './dto/update-member-informations.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberInformation } from './entities/member-information.entity';

@Injectable()
export class MembersInformationsService {
  constructor(
    @InjectRepository(MemberInformation)
    private memberInformationsRepository: Repository<MemberInformation>,
  ) {}

  create(createMemberInformationDto: CreateMemberInformationsDto) {
    return this.memberInformationsRepository.save(createMemberInformationDto);
  }

  findAll() {
    return this.memberInformationsRepository.find();
  }

  findOne(uuid: string) {
    return this.memberInformationsRepository.findOneBy({ uuid });
  }

  update(uuid: string, updateMemberInformationDto: UpdateMemberInformationsDto) {
    return this.memberInformationsRepository.update(uuid, updateMemberInformationDto);
  }

  remove(uuid: string) {
    return this.memberInformationsRepository.delete(uuid);
  }
}

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMemberInformationsDto } from './dto/create-member-informations.dto';
import { UpdateMemberInformationsDto } from './dto/update-member-informations.dto';
import { MemberInformations } from './entities/member-informations.entity';

@Injectable()
export class MembersInformationsService {
  
  constructor(
    @InjectRepository(MemberInformations)
    private memberInformationsRepository: Repository<MemberInformations>,
  ) {}

  create(createMemberInformationsDto: CreateMemberInformationsDto) {
    const memberInformations = this.memberInformationsRepository.create(createMemberInformationsDto);
    return this.memberInformationsRepository.save(memberInformations);
  }

  findAll() {
    return this.memberInformationsRepository.find();
  }

  findOne(uuid: string) {
    return this.memberInformationsRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updateMemberInformationsDto: UpdateMemberInformationsDto) {
    const memberInformations = await this.memberInformationsRepository.findOneBy({ uuid });
    if (!memberInformations) {
      return null;
    }
    Object.assign(memberInformations, updateMemberInformationsDto);
    return this.memberInformationsRepository.save(memberInformations);
  }

  remove(uuid: string) {
    return this.memberInformationsRepository.delete({ uuid });
  }

}

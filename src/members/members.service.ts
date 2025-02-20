import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  // Créer un nouveau membre
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create(createMemberDto);
    return await this.membersRepository.save(member);
  }

  // Récupérer tous les membres
  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find();
  }

  // Récupérer un membre par son uuid
  async findOne(uuid_member: string): Promise<Member> {
    const member = await this.membersRepository.findOneBy({ uuid_member });
    if (!member) {
      throw new NotFoundException(`Member with UUID ${uuid_member} not found`);
    }
    return member;
  }

  // Mettre à jour un membre
  async update(uuid_member: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(uuid_member);
    Object.assign(member, updateMemberDto);
    return await this.membersRepository.save(member);
  }

  // Supprimer un membre
  async remove(uuid_member: string): Promise<void> {
    const result = await this.membersRepository.delete({ uuid_member });
    if (result.affected === 0) {
      throw new NotFoundException(`Member with UUID ${uuid_member} not found`);
    }
  }
}
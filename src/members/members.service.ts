import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AssignRoleToMemberDto } from './../roles/dto/assign-role-to-member.dto';
import { UpdateMemberRolesDto } from './../roles/dto/update-member-roles.dto';
import { Member } from './entities/member.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>
  ) {}

  // Créer un nouveau membre
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create(createMemberDto);
    return await this.membersRepository.save(member);
  }

  // Récupérer tous les membres
  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find({
      relations: ['resources']
    });
  }

  // Récupérer un membre par son uuid
  async findOne(uuid_member: string): Promise<Member> {
    const member = await this.membersRepository.findOne({
      where: { uuid_member },
      relations: ['resources']
    });
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
  async remove(uuid_member: string): Promise<DeleteResult> {
    const result = await this.membersRepository.delete({ uuid_member });
    if (result.affected === 0) {
      throw new NotFoundException(`Member with UUID ${uuid_member} not found`);
    }
    return result;
  }

  async assignRoleToMember(uuid_member: string, uuid_role: string): Promise<Member> {
    const member = await this.membersRepository.findOne({
        where: { uuid_member },
        relations: ['roles'],
    });

    if (!member) {
        throw new NotFoundException(`Member with UUID ${uuid_member} not found`);
    }

    const role = await this.rolesRepository.findOne({ where: { uuid_role } });
    if (!role) {
        throw new NotFoundException(`Role with UUID ${uuid_role} not found`);
    }

    // Vérifier si le membre possède déjà ce rôle
    if (member.roles.some(r => r.uuid_role === uuid_role)) {
        throw new BadRequestException(`Member already has the role ${uuid_role}`);
    }

    // Ajouter le rôle au membre
    member.roles.push(role);

    // Incrémenter `member_count`
    role.member_count = (parseInt(role.member_count, 10) + 1).toString();
    await this.rolesRepository.save(role);

    return await this.membersRepository.save(member);
}


async removeRoleFromMember(uuid_member: string, uuid_role: string): Promise<Member> {
  const member = await this.membersRepository.findOne({
      where: { uuid_member },
      relations: ['roles'],
  });

  if (!member) {
      throw new NotFoundException(`Member with UUID ${uuid_member} not found`);
  }

  const role = await this.rolesRepository.findOne({ where: { uuid_role } });
  if (!role) {
      throw new NotFoundException(`Role with UUID ${uuid_role} not found`);
  }

  // Supprimer le rôle du membre
  member.roles = member.roles.filter(r => r.uuid_role !== uuid_role);

  // Mettre à jour `member_count`
  role.member_count = Math.max(0, parseInt(role.member_count, 10) - 1).toString();
  await this.rolesRepository.save(role);

  return await this.membersRepository.save(member);
}

}
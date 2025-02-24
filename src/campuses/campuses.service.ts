import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { Campus } from './entities/campus.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class CampusesService {
  constructor(
    @InjectRepository(Campus)
    private campusRepository: Repository<Campus>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createCampusDto: CreateCampusDto): Promise<Campus> {
    try {
      const newRole = this.roleRepository.create({
        uuid_role: createCampusDto.uuid_role, 
        uuid_guild: createCampusDto.uuid_guild,
        name: createCampusDto.name,
        member_count: "0",
        role_position: "0",
        hoist: false,
        color: "#000000",
      });

      const savedRole = await this.roleRepository.save(newRole);

      const newCampus = this.campusRepository.create({
        ...createCampusDto,
        uuid_role: savedRole.uuid_role,
      });

      return await this.campusRepository.save(newCampus);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création du campus: ' + error.message);
    }
  }

  findAll() {
    return this.campusRepository.find();
  }

  findOne(uuid_campus: string) {
    if (!uuid_campus) {
      throw new NotFoundException('UUID du campus manquant');
    }
    return this.campusRepository.findOneBy({ uuid_campus });
  }

  async update(uuid_campus: string, updateCampusDto: UpdateCampusDto) {
    const campus = await this.campusRepository.findOneBy({ uuid_campus : uuid_campus });
    if (!campus) {
      throw new NotFoundException(`Campus with UUID "${uuid_campus}" not found`);
    }
    Object.assign(campus, updateCampusDto);
    return this.campusRepository.save(campus);
  }

  remove(uuid_campus: string) {
    if (!uuid_campus) {
      throw new NotFoundException(`Campus with UUID "${uuid_campus}" not found`);
    }
    return this.campusRepository.delete({ uuid_campus });
  }
}

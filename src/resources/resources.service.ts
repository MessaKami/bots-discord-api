import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const { creator, ...resourceData } = createResourceDto;
    
    // On cherche le membre
    const member = await this.membersRepository.findOne({
      where: { uuid_member: creator }
    });
    if (!member) {
      throw new NotFoundException(`Member with UUID ${creator} not found`);
    }

    // On crée la ressource avec le membre
    const resource = this.resourcesRepository.create({
      ...resourceData,
      creator: member
    });
    
    return await this.resourcesRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourcesRepository.find({
      relations: ['creator']
    });
  }

  async findOne(uuid: string): Promise<Resource> {
    const resource = await this.resourcesRepository.findOne({
      where: { uuid_resource: uuid },
      relations: ['creator']
    });

    if (!resource) {
      throw new NotFoundException(`Resource with UUID ${uuid} not found`);
    }

    return resource;
  }

  async update(uuid: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.findOne(uuid);
    Object.assign(resource, updateResourceDto);
    return await this.resourcesRepository.save(resource);
  }

  async remove(uuid: string): Promise<void> {
    const resource = await this.findOne(uuid);
    await this.resourcesRepository.delete({ uuid_resource: uuid });
  }
} 
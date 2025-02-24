import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Member } from '../members/entities/member.entity';
import { plainToInstance } from 'class-transformer';
import { ResourceResponseDto } from './dto/responses/resource.response.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<ResourceResponseDto> {
    const { uuid_member, ...resourceData } = createResourceDto;
    
    // On cherche le membre
    const member = await this.membersRepository.findOne({
      where: { uuid_member: uuid_member }
    });
    if (!member) {
      throw new NotFoundException(`Member with UUID ${uuid_member} not found`);
    }

    // On crée la ressource avec le membre
    const resource = this.resourcesRepository.create({
      ...resourceData,
      creator: member
    });
    
    const savedResource = await this.resourcesRepository.save(resource);
    const resourceWithRelations = await this.resourcesRepository.findOne({
      where: { uuid_resource: savedResource.uuid_resource },
      relations: ['creator', 'reports', 'reports.reporter']
    });
    return plainToInstance(ResourceResponseDto, resourceWithRelations, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ResourceResponseDto[]> {
    const resources = await this.resourcesRepository.find({
      relations: ['creator', 'reports', 'reports.reporter']
    });
    return resources.map(resource => 
      plainToInstance(ResourceResponseDto, resource, { excludeExtraneousValues: true })
    );
  }

  async findOne(uuid: string): Promise<ResourceResponseDto> {
    const resource = await this.resourcesRepository.findOne({
      where: { uuid_resource: uuid },
      relations: ['creator', 'reports', 'reports.reporter']
    });

    if (!resource) {
      throw new NotFoundException(`Resource with UUID ${uuid} not found`);
    }

    return plainToInstance(ResourceResponseDto, resource, { excludeExtraneousValues: true });
  }

  async update(uuid: string, updateResourceDto: UpdateResourceDto): Promise<ResourceResponseDto> {
    const existingResource = await this.resourcesRepository.findOne({
      where: { uuid_resource: uuid }
    });
    
    if (!existingResource) {
      throw new NotFoundException(`Resource with UUID ${uuid} not found`);
    }

    const updatedResource = await this.resourcesRepository.save({
      ...existingResource,
      ...updateResourceDto
    });

    const resourceWithRelations = await this.resourcesRepository.findOne({
      where: { uuid_resource: updatedResource.uuid_resource },
      relations: ['creator', 'reports', 'reports.reporter']
    });

    return plainToInstance(ResourceResponseDto, resourceWithRelations, { excludeExtraneousValues: true });
  }

  async remove(uuid: string): Promise<void> {
    const resource = await this.resourcesRepository.findOne({
      where: { uuid_resource: uuid }
    });
    
    if (!resource) {
      throw new NotFoundException(`Resource with UUID ${uuid} not found`);
    }

    await this.resourcesRepository.remove(resource);
  }
} 
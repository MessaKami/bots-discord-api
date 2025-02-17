import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.resourcesRepository.create(createResourceDto);
    return await this.resourcesRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourcesRepository.find();
  }

  async findOne(uuid: string): Promise<Resource> {
    const resource = await this.resourcesRepository.findOne({ where: { uuid_resource: uuid } });
    if (!resource) {
      throw new NotFoundException(`Resource with UUID ${uuid} not found`);
    }
    return resource;
  }

  async update(uuid: string, updateResourceDto: Partial<CreateResourceDto>): Promise<Resource> {
    const resource = await this.findOne(uuid);
    Object.assign(resource, updateResourceDto);
    return await this.resourcesRepository.save(resource);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.resourcesRepository.delete(uuid);
    if (result.affected === 0) {
      throw new NotFoundException(`Resource with UUID ${uuid} not found`);
    }
  }
} 
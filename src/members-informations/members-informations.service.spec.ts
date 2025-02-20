import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MembersInformationsService } from './members-informations.service';
import { Repository } from 'typeorm';
import { MemberInformation } from './entities/member-information.entity';
import { CreateMemberInformationsDto } from './dto/create-member-informations.dto';
import { UpdateMemberInformationsDto } from './dto/update-member-informations.dto';

const mockRepository = {
  find: vi.fn(),
  findOneBy: vi.fn(),
  save: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};

describe('MembersInformationsService', () => {
  let service: MembersInformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersInformationsService,
        {
          provide: getRepositoryToken(MemberInformation),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MembersInformationsService>(MembersInformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new member information', async () => {
    const dto: CreateMemberInformationsDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    const entity = { 
      ...dto, 
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockRepository.save.mockResolvedValue(entity);

    const result = await service.create(dto);
    expect(result).toEqual(entity);
    expect(mockRepository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of members informations', async () => {
    const result = [{
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    mockRepository.find.mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a single member information', async () => {
    const result = {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockRepository.findOneBy.mockResolvedValue(result);

    expect(await service.findOne('123e4567-e89b-12d3-a456-426614174000')).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-426614174000' });
  });

  it('should update a member information', async () => {
    const dto: UpdateMemberInformationsDto = { firstName: 'Jane' };
    const result = { affected: 1 };
    mockRepository.update.mockResolvedValue(result);

    expect(await service.update('123e4567-e89b-12d3-a456-426614174000', dto)).toEqual(result);
    expect(mockRepository.update).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', dto);
  });

  it('should delete a member information', async () => {
    const result = { affected: 1 };
    mockRepository.delete.mockResolvedValue(result);

    expect(await service.remove('123e4567-e89b-12d3-a456-426614174000')).toEqual(result);
    expect(mockRepository.delete).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
  });
});


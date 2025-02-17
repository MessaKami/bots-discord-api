import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MembersInformationsService } from './members-informations.service';
import { Repository } from 'typeorm';
import { MemberInformations } from './entities/member-informations.entity';
import { CreateMemberInformationsDto } from './dto/create-member-informations.dto';
import { UpdateMemberInformationsDto } from './dto/update-member-informations.dto';

const mockRepository = {
  create: vi.fn(),
  save: vi.fn(),
  find: vi.fn(),
  findOneBy: vi.fn(),
  delete: vi.fn(),
};

describe('MembersInformationsService', () => {
  let service: MembersInformationsService;

  beforeEach(() => {
    service = new MembersInformationsService(mockRepository as unknown as Repository<MemberInformations>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new member information', async () => {
    const dto: CreateMemberInformationsDto = {
      uuid_member: '123e4567-e89b-12d3-a456-4266141740000000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    const entity = { ...dto, uuid: '123e4567-e89b-12d3-a456-4266141740000000' };
    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);

    expect(await service.create(dto)).toEqual(entity);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(entity);
  });

  it('should return an array of members informations', async () => {
    const result = [{ uuid: '123e4567-e89b-12d3-a456-4266141740000000', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.findAll()).toEqual(result);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a single member information', async () => {
    const result = { uuid: '123e4567-e89b-12d3-a456-4266141740000000', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    mockRepository.findOneBy.mockResolvedValue(result);
    expect(await service.findOne('123e4567-e89b-12d3-a456-4266141740000000')).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-4266141740000000' });
  });

  it('should update a member information', async () => {
    const dto: UpdateMemberInformationsDto = { firstName: 'Jane' };
    const result = { uuid: '123e4567-e89b-12d3-a456-4266141740000000', firstName: 'Jane', lastName: 'Doe', email: 'john.doe@example.com' };
    mockRepository.findOneBy.mockResolvedValue(result);
    mockRepository.save.mockResolvedValue(result);

    expect(await service.update('123e4567-e89b-12d3-a456-4266141740000000', dto)).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-4266141740000000' });
    expect(mockRepository.save).toHaveBeenCalledWith(result);
  });

  it('should delete a member information', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    expect(await service.remove('123e4567-e89b-12d3-a456-4266141740000000')).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-4266141740000000' });
  });
});


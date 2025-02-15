import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CampusService } from './campuses.service';
import { Repository } from 'typeorm';
import { Campus } from './entities/campus.entity';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

const mockRepository = {
  create: vi.fn(),
  save: vi.fn(),
  find: vi.fn(),
  findOneBy: vi.fn(),
  delete: vi.fn(),
};

describe('CampusService', () => {
  let service: CampusService;

  beforeEach(() => {
    service = new CampusService(mockRepository as unknown as Repository<Campus>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new campus', async () => {
    const dto: CreateCampusDto = { name: 'Test Campus' };
    const entity = { uuid: '123e4567-e89b-12d3-a456-426614174000', ...dto };
    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);

    expect(await service.create(dto)).toEqual(entity);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(entity);
  });

  it('should return an array of campuses', async () => {
    const result = [{ uuid: '123e4567-e89b-12d3-a456-426614174000', name: 'Test Campus' }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.findAll()).toEqual(result);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a single campus', async () => {
    const result = { uuid: '123e4567-e89b-12d3-a456-426614174000', name: 'Test Campus' };
    mockRepository.findOneBy.mockResolvedValue(result);
    expect(await service.findOne('123e4567-e89b-12d3-a456-426614174000')).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-426614174000' });
  });

  it('should update a campus', async () => {
    const dto: UpdateCampusDto = { name: 'Updated Campus' };
    const result = { uuid: '123e4567-e89b-12d3-a456-426614174000', name: 'Updated Campus' };
    mockRepository.findOneBy.mockResolvedValue(result);
    mockRepository.save.mockResolvedValue(result);

    expect(await service.update('123e4567-e89b-12d3-a456-426614174000', dto)).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-426614174000' });
    expect(mockRepository.save).toHaveBeenCalledWith(result);
  });

  it('should delete a campus', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    expect(await service.remove('123e4567-e89b-12d3-a456-426614174000')).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith({ uuid: '123e4567-e89b-12d3-a456-426614174000' });
  });
});
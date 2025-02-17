import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GuildService } from './guilds.service';
import { Repository } from 'typeorm';
import { Guild } from './entities/guild.entity';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

const mockRepository = {
  create: vi.fn(),
  save: vi.fn(),
  find: vi.fn(),
  findOneBy: vi.fn(),
  delete: vi.fn(),
};

describe('GuildService', () => {
  let service: GuildService;

  beforeEach(() => {
    service = new GuildService(mockRepository as unknown as Repository<Guild>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new guild', async () => {
    const dto: CreateGuildDto = {
      uuid: '123456789012345678',
      name: 'Test Guild',
      memberCount: 10,
      configuration: {},
    };
    const entity = { ...dto };
    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);

    expect(await service.create(dto)).toEqual(entity);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(entity);
  });

  it('should return an array of guilds', async () => {
    const result = [{ uuid: '123456789012345678', name: 'Test Guild', memberCount: 10, configuration: {} }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.findAll()).toEqual(result);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a single guild', async () => {
    const result = { uuid: '123456789012345678', name: 'Test Guild', memberCount: 10, configuration: {} };
    mockRepository.findOneBy.mockResolvedValue(result);
    expect(await service.findOne('123456789012345678')).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123456789012345678' });
  });

  it('should update a guild', async () => {
    const dto: UpdateGuildDto = {
      uuid: '123456789012345678',
      name: 'Updated Guild',
      memberCount: 15,
      configuration: { setting: true },
    };
    const result = { ...dto };
    mockRepository.findOneBy.mockResolvedValue(result);
    mockRepository.save.mockResolvedValue(result);

    expect(await service.update('123456789012345678', dto)).toEqual(result);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ uuid: '123456789012345678' });
    expect(mockRepository.save).toHaveBeenCalledWith(result);
  });

  it('should delete a guild', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    expect(await service.remove('123456789012345678')).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith({ uuid: '123456789012345678' });
  });
});

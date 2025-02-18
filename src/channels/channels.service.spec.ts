import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ChannelsService', () => {
  let service: ChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        {
          provide: getRepositoryToken(Channel),
          useValue: {
            create: vi.fn(),
            save: vi.fn(),
            find: vi.fn(),
            findOneBy: vi.fn(),
            delete: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 
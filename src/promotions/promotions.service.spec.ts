import { Test, TestingModule } from '@nestjs/testing';
import { PromotionsService } from './promotions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PromotionsService', () => {
  let service: PromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionsService,
        {
          provide: getRepositoryToken(Promotion),
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

    service = module.get<PromotionsService>(PromotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 
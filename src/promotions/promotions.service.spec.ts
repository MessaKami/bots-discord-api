import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from './promotions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PromotionService', () => {
  let service: PromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionService,
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

    service = module.get<PromotionService>(PromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 
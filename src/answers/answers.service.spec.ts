import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersService],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

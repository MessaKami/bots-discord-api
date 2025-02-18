import { validate } from 'class-validator';
import { CreateXpTransactionDto } from './create-xp-transaction.dto';
import { expect, describe, it, beforeEach } from 'vitest';

describe('CreateXpTransactionDto', () => {
  let dto: CreateXpTransactionDto;

  beforeEach(() => {
    dto = new CreateXpTransactionDto();
    dto.userId = '123e4567-e89b-12d3-a456-426614174000';
    dto.amount = 100;
    dto.reason = 'Participation active dans le salon d\'entraide';
  });

  it('devrait valider un DTO correct', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('userId', () => {
    it('devrait échouer si userId n\'est pas une chaîne', async () => {
      dto.userId = 123 as any;
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('userId');
    });

    it('devrait échouer si userId n\'a pas 36 caractères', async () => {
      dto.userId = '123';
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('userId');
    });
  });

  describe('amount', () => {
    it('devrait échouer si amount n\'est pas un nombre', async () => {
      dto.amount = '100' as any;
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('amount');
    });

    it('devrait échouer si amount est inférieur à -1000', async () => {
      dto.amount = -1001;
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('amount');
    });

    it('devrait échouer si amount est supérieur à 1000', async () => {
      dto.amount = 1001;
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('amount');
    });
  });

  describe('reason', () => {
    it('devrait échouer si reason n\'est pas une chaîne', async () => {
      dto.reason = 123 as any;
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('reason');
    });

    it('devrait échouer si reason dépasse 200 caractères', async () => {
      dto.reason = 'a'.repeat(201);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('reason');
    });
  });

  describe('notes', () => {
    it('devrait valider si notes est absent', async () => {
      dto.notes = undefined;
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('devrait échouer si notes n\'est pas une chaîne', async () => {
      dto.notes = 123 as any;
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('notes');
    });

    it('devrait échouer si notes dépasse 500 caractères', async () => {
      dto.notes = 'a'.repeat(501);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('notes');
    });
  });
}); 
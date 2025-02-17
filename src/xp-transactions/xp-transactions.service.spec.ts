import { Test, TestingModule } from '@nestjs/testing';
import { XpTransactionsService } from './xp-transactions.service';
import { CreateXpTransactionDto } from './dto/create-xp-transaction.dto';
import { UpdateXpTransactionDto } from './dto/update-xp-transaction.dto';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('XpTransactionsService', () => {
  let service: XpTransactionsService;

  // Mock des données de test
  const mockCreateDto: CreateXpTransactionDto = {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    amount: 100,
    reason: 'Test transaction',
    notes: 'Test notes'
  };

  const mockUpdateDto: UpdateXpTransactionDto = {
    amount: 200,
    reason: 'Updated test transaction'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XpTransactionsService],
    }).compile();

    service = module.get<XpTransactionsService>(XpTransactionsService);
  });

  describe('create', () => {
    it('devrait créer une nouvelle transaction XP', () => {
      // Act
      const result = service.create(mockCreateDto);

      // Assert
      expect(result).toBe('This action adds a new xpTransaction');
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les transactions XP', () => {
      // Act
      const result = service.findAll();

      // Assert
      expect(result).toBe('This action returns all xpTransactions');
    });
  });

  describe('findOne', () => {
    it('devrait retourner une transaction XP spécifique', () => {
      // Arrange
      const id = 1;

      // Act
      const result = service.findOne(id);

      // Assert
      expect(result).toBe(`This action returns a #${id} xpTransaction`);
    });

    it('devrait gérer un ID invalide', () => {
      // Arrange
      const invalidId = -1;

      // Act & Assert
      expect(() => service.findOne(invalidId)).not.toThrow();
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une transaction XP', () => {
      // Arrange
      const id = 1;

      // Act
      const result = service.update(id, mockUpdateDto);

      // Assert
      expect(result).toBe(`This action updates a #${id} xpTransaction`);
    });

    it('devrait gérer un ID invalide', () => {
      // Arrange
      const invalidId = -1;

      // Act & Assert
      expect(() => service.update(invalidId, mockUpdateDto)).not.toThrow();
    });
  });

  describe('remove', () => {
    it('devrait supprimer une transaction XP', () => {
      // Arrange
      const id = 1;

      // Act
      const result = service.remove(id);

      // Assert
      expect(result).toBe(`This action removes a #${id} xpTransaction`);
    });

    it('devrait gérer un ID invalide', () => {
      // Arrange
      const invalidId = -1;

      // Act & Assert
      expect(() => service.remove(invalidId)).not.toThrow();
    });
  });
}); 
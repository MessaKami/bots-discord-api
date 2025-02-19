import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VotesService } from './votes.service';
import { Repository, UpdateResult } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

describe('VotesService', () => {
  let service: VotesService;
  let repository: Repository<Vote>;

  const mockVote: Vote = {
    voteUuid: '123e4567-e89b-12d3-a456-426614174000',
    userId: '123e4567-e89b-12d3-a456-426614174001',
    itemId: '123e4567-e89b-12d3-a456-426614174002',
    voteType: 'upvote',
    voteCreatedAt: new Date(),
    voteUpdatedAt: new Date(),
    voteIsActive: true
  };

  const mockCreateVoteDto: CreateVoteDto = {
    userId: '123e4567-e89b-12d3-a456-426614174001',
    itemId: '123e4567-e89b-12d3-a456-426614174002',
    voteType: 'upvote'
  };

  const mockUpdateVoteDto: UpdateVoteDto = {
    voteIsActive: false
  };

  beforeEach(() => {
    repository = {
      create: vi.fn(),
      save: vi.fn(),
      find: vi.fn(),
      findOne: vi.fn(),
      softDelete: vi.fn()
    } as unknown as Repository<Vote>;

    service = new VotesService(repository);
  });

  describe('create', () => {
    it('devrait créer un vote avec succès', async () => {
      vi.spyOn(repository, 'create').mockReturnValue(mockVote);
      vi.spyOn(repository, 'save').mockResolvedValue(mockVote);

      const result = await service.create(mockCreateVoteDto);

      expect(result).toEqual(mockVote);
      expect(repository.create).toHaveBeenCalledWith(mockCreateVoteDto);
      expect(repository.save).toHaveBeenCalledWith(mockVote);
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les votes actifs', async () => {
      vi.spyOn(repository, 'find').mockResolvedValue([mockVote]);

      const result = await service.findAll();

      expect(result).toEqual([mockVote]);
      expect(repository.find).toHaveBeenCalledWith({
        where: { voteIsActive: true }
      });
    });
  });

  describe('findOne', () => {
    it('devrait retourner un vote spécifique', async () => {
      vi.spyOn(repository, 'findOne').mockResolvedValue(mockVote);

      const result = await service.findOne(mockVote.voteUuid);

      expect(result).toEqual(mockVote);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { voteUuid: mockVote.voteUuid, voteIsActive: true }
      });
    });

    it('devrait retourner null si le vote n\'existe pas', async () => {
      vi.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un vote avec succès', async () => {
      const updatedVote = { ...mockVote, ...mockUpdateVoteDto };
      vi.spyOn(repository, 'findOne').mockResolvedValue(mockVote);
      vi.spyOn(repository, 'save').mockResolvedValue(updatedVote);

      const result = await service.update(mockVote.voteUuid, mockUpdateVoteDto);

      expect(result).toEqual(updatedVote);
      expect(repository.save).toHaveBeenCalledWith(updatedVote);
    });

    it('devrait retourner null si le vote n\'existe pas', async () => {
      vi.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.update('non-existent-id', mockUpdateVoteDto);

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('devrait supprimer un vote avec succès', async () => {
      vi.spyOn(repository, 'findOne').mockResolvedValue(mockVote);
      vi.spyOn(repository, 'softDelete').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: []
      } as UpdateResult);

      const result = await service.remove(mockVote.voteUuid);

      expect(result).toBe(true);
      expect(repository.softDelete).toHaveBeenCalledWith(mockVote.voteUuid);
    });

    it('devrait retourner false si le vote n\'existe pas', async () => {
      vi.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.remove('non-existent-id');

      expect(result).toBe(false);
    });
  });
});

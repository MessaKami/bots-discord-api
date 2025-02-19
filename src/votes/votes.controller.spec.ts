import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './entities/vote.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('VotesController', () => {
  let controller: VotesController;
  let service: VotesService;

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
    service = {
      create: vi.fn(),
      findAll: vi.fn(),
      findOne: vi.fn(),
      update: vi.fn(),
      remove: vi.fn()
    } as unknown as VotesService;

    controller = new VotesController(service);
  });

  describe('create', () => {
    it('devrait créer un vote avec succès', async () => {
      vi.spyOn(service, 'create').mockResolvedValue(mockVote);

      const result = await controller.create(mockCreateVoteDto);

      expect(result).toEqual(mockVote);
      expect(service.create).toHaveBeenCalledWith(mockCreateVoteDto);
    });

    it('devrait gérer les erreurs lors de la création', async () => {
      vi.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create(mockCreateVoteDto)).rejects.toThrow(
        new HttpException('Erreur lors de la création du vote', HttpStatus.BAD_REQUEST)
      );
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les votes', async () => {
      vi.spyOn(service, 'findAll').mockResolvedValue([mockVote]);

      const result = await controller.findAll();

      expect(result).toEqual([mockVote]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs lors de la récupération', async () => {
      vi.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrow(
        new HttpException('Erreur lors de la récupération des votes', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('findOne', () => {
    it('devrait retourner un vote spécifique', async () => {
      vi.spyOn(service, 'findOne').mockResolvedValue(mockVote);

      const result = await controller.findOne(mockVote.voteUuid);

      expect(result).toEqual(mockVote);
      expect(service.findOne).toHaveBeenCalledWith(mockVote.voteUuid);
    });

    it('devrait retourner une erreur 404 si le vote n\'existe pas', async () => {
      vi.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        new HttpException('Vote non trouvé', HttpStatus.NOT_FOUND)
      );
    });

    it('devrait gérer les erreurs lors de la récupération', async () => {
      vi.spyOn(service, 'findOne').mockRejectedValue(new Error());

      await expect(controller.findOne(mockVote.voteUuid)).rejects.toThrow(
        new HttpException('Erreur lors de la récupération du vote', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un vote avec succès', async () => {
      const updatedVote = { ...mockVote, ...mockUpdateVoteDto };
      vi.spyOn(service, 'update').mockResolvedValue(updatedVote);

      const result = await controller.update(mockVote.voteUuid, mockUpdateVoteDto);

      expect(result).toEqual(updatedVote);
      expect(service.update).toHaveBeenCalledWith(mockVote.voteUuid, mockUpdateVoteDto);
    });

    it('devrait retourner une erreur 404 si le vote n\'existe pas', async () => {
      vi.spyOn(service, 'update').mockResolvedValue(null);

      await expect(controller.update('non-existent-id', mockUpdateVoteDto)).rejects.toThrow(
        new HttpException('Vote non trouvé', HttpStatus.NOT_FOUND)
      );
    });

    it('devrait gérer les erreurs lors de la mise à jour', async () => {
      vi.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(controller.update(mockVote.voteUuid, mockUpdateVoteDto)).rejects.toThrow(
        new HttpException('Erreur lors de la mise à jour du vote', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('remove', () => {
    it('devrait supprimer un vote avec succès', async () => {
      vi.spyOn(service, 'remove').mockResolvedValue(true);

      await controller.remove(mockVote.voteUuid);

      expect(service.remove).toHaveBeenCalledWith(mockVote.voteUuid);
    });

    it('devrait retourner une erreur 404 si le vote n\'existe pas', async () => {
      vi.spyOn(service, 'remove').mockResolvedValue(false);

      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        new HttpException('Vote non trouvé', HttpStatus.NOT_FOUND)
      );
    });

    it('devrait gérer les erreurs lors de la suppression', async () => {
      vi.spyOn(service, 'remove').mockRejectedValue(new Error());

      await expect(controller.remove(mockVote.voteUuid)).rejects.toThrow(
        new HttpException('Erreur lors de la suppression du vote', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});

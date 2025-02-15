import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';
import { ModeratorAction } from './entities/moderator-action.entity';

@Injectable()
export class ModeratorActionsService {
  constructor(
    @InjectRepository(ModeratorAction)
    private readonly moderatorActionRepository: Repository<ModeratorAction>,
  ) {}

  /**
   * Crée une nouvelle action de modération
   * @throws BadRequestException si la création échoue
   */
  async create(createDto: CreateModeratorActionDto): Promise<ModeratorAction> {
    try {
      const moderatorAction = this.moderatorActionRepository.create(createDto);
      return await this.moderatorActionRepository.save(moderatorAction);
    } catch (error) {
      throw new BadRequestException(
        'Impossible de créer l\'action de modération: ' + error.message,
      );
    }
  }

  /**
   * Récupère toutes les actions de modération
   * @returns Liste des actions triées par date de création
   */
  async findAll(): Promise<ModeratorAction[]> {
    try {
      return await this.moderatorActionRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Erreur lors de la récupération des actions de modération',
      );
    }
  }

  /**
   * Récupère une action de modération spécifique
   * @throws NotFoundException si l'action n'existe pas
   */
  async findOne(id: string): Promise<ModeratorAction> {
    try {
      const action = await this.moderatorActionRepository.findOne({
        where: { id },
      });

      if (!action) {
        throw new NotFoundException(
          `Action de modération avec l'ID ${id} non trouvée`,
        );
      }

      return action;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de la récupération de l'action de modération: ${error.message}`,
      );
    }
  }

  /**
   * Met à jour une action de modération
   * @throws NotFoundException si l'action n'existe pas
   * @throws BadRequestException si la mise à jour échoue
   */
  async update(id: string, updateDto: UpdateModeratorActionDto): Promise<ModeratorAction> {
    const existingAction = await this.findOne(id);

    try {
      Object.assign(existingAction, updateDto);
      return await this.moderatorActionRepository.save(existingAction);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la mise à jour de l'action de modération: ${error.message}`,
      );
    }
  }

  /**
   * Supprime une action de modération
   * @throws NotFoundException si l'action n'existe pas
   */
  async remove(id: string): Promise<void> {
    const action = await this.findOne(id);

    try {
      await this.moderatorActionRepository.remove(action);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la suppression de l'action de modération: ${error.message}`,
      );
    }
  }
}

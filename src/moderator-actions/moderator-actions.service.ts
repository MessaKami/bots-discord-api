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

  async create(createModeratorActionDto: CreateModeratorActionDto): Promise<ModeratorAction> {
    try {
      const moderatorAction = this.moderatorActionRepository.create(createModeratorActionDto);
      return await this.moderatorActionRepository.save(moderatorAction);
    } catch (error) {
      throw new BadRequestException('Impossible de créer l\'action de modération');
    }
  }

  async findAll(): Promise<ModeratorAction[]> {
    try {
      return await this.moderatorActionRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      throw new BadRequestException('Impossible de récupérer les actions de modération');
    }
  }

  async findOne(id: string): Promise<ModeratorAction> {
    try {
      const moderatorAction = await this.moderatorActionRepository.findOne({
        where: { id },
      });

      if (!moderatorAction) {
        throw new NotFoundException('Action de modération non trouvée');
      }

      return moderatorAction;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Impossible de récupérer l\'action de modération');
    }
  }

  async update(id: string, updateModeratorActionDto: UpdateModeratorActionDto): Promise<ModeratorAction> {
    try {
      const moderatorAction = await this.findOne(id);
      
      Object.assign(moderatorAction, updateModeratorActionDto);
      
      return await this.moderatorActionRepository.save(moderatorAction);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Impossible de mettre à jour l\'action de modération');
    }
  }

  async remove(id: string): Promise<ModeratorAction> {
    try {
      const moderatorAction = await this.findOne(id);
      
      return await this.moderatorActionRepository.remove(moderatorAction);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Impossible de supprimer l\'action de modération');
    }
  }
}

import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Put, 
  Param, 
  Delete, 
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ModeratorActionsService } from './moderator-actions.service';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';

@Controller('moderator-actions')
export class ModeratorActionsController {
  constructor(private readonly moderatorActionsService: ModeratorActionsService) {}

  /**
   * Crée une nouvelle action de modération
   * @returns L'action créée avec un statut 201
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createDto: CreateModeratorActionDto,
  ) {
    const action = await this.moderatorActionsService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Action de modération créée avec succès',
      data: action,
    };
  }

  /**
   * Récupère toutes les actions de modération
   * @returns Liste des actions avec un statut 200
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const actions = await this.moderatorActionsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: actions,
    };
  }

  /**
   * Récupère une action de modération spécifique
   * @param id UUID de l'action à récupérer
   * @returns L'action trouvée avec un statut 200
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const action = await this.moderatorActionsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: action,
    };
  }

  /**
   * Met à jour une action de modération
   * @param id UUID de l'action à mettre à jour
   * @returns L'action mise à jour avec un statut 200
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateDto: UpdateModeratorActionDto,
  ) {
    const action = await this.moderatorActionsService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Action de modération mise à jour avec succès',
      data: action,
    };
  }

  /**
   * Supprime une action de modération
   * @param id UUID de l'action à supprimer
   * @returns Message de confirmation avec un statut 200
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.moderatorActionsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Action de modération supprimée avec succès',
    };
  }
}

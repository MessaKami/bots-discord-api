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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ModeratorAction } from './entities/moderator-action.entity';

@ApiTags('Modération')
@Controller('moderator-actions')
export class ModeratorActionsController {
  constructor(private readonly moderatorActionsService: ModeratorActionsService) {}

  /**
   * Crée une nouvelle action de modération
   * @returns L'action créée avec un statut 201
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer une nouvelle action de modération' })
  @ApiBody({ type: CreateModeratorActionDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Action de modération créée avec succès',
    type: ModeratorAction 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides' 
  })
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
  @ApiOperation({ summary: 'Récupérer toutes les actions de modération' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Liste des actions de modération',
    type: [ModeratorAction]
  })
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
  @ApiOperation({ summary: 'Récupérer une action de modération par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'action de modération', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Action de modération trouvée',
    type: ModeratorAction
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Action de modération non trouvée' 
  })
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
  @ApiOperation({ summary: 'Mettre à jour une action de modération' })
  @ApiParam({ name: 'id', description: 'ID de l\'action de modération', type: 'string' })
  @ApiBody({ type: UpdateModeratorActionDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Action de modération mise à jour avec succès',
    type: ModeratorAction
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Action de modération non trouvée' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides' 
  })
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
  @ApiOperation({ summary: 'Supprimer une action de modération' })
  @ApiParam({ name: 'id', description: 'ID de l\'action de modération', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Action de modération supprimée avec succès' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Action de modération non trouvée' 
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.moderatorActionsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Action de modération supprimée avec succès',
    };
  }
}

import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpException, ValidationPipe, UsePipes } from '@nestjs/common';
import { ModeratorActionsService } from './moderator-actions.service';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';

@Controller('moderator-actions')
export class ModeratorActionsController {
  constructor(private readonly moderatorActionsService: ModeratorActionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createModeratorActionDto: CreateModeratorActionDto) {
    try {
      const action = await this.moderatorActionsService.create(createModeratorActionDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Action de modération créée avec succès',
        data: action,
      };
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la création de l\'action de modération',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const actions = await this.moderatorActionsService.findAll();
      return {
        statusCode: HttpStatus.OK,
        data: actions,
      };
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des actions de modération',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const action = await this.moderatorActionsService.findOne(+id);
      if (!action) {
        throw new HttpException('Action de modération non trouvée', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        data: action,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur lors de la récupération de l\'action de modération',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateModeratorActionDto: UpdateModeratorActionDto,
  ) {
    try {
      const action = await this.moderatorActionsService.update(+id, updateModeratorActionDto);
      if (!action) {
        throw new HttpException('Action de modération non trouvée', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Action de modération mise à jour avec succès',
        data: action,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur lors de la mise à jour de l\'action de modération',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const action = await this.moderatorActionsService.remove(+id);
      if (!action) {
        throw new HttpException('Action de modération non trouvée', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Action de modération supprimée avec succès',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur lors de la suppression de l\'action de modération',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

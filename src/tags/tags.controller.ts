import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau tag' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tag créé avec succès', type: Tag })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Tag déjà existant' })
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les tags' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste des tags récupérée avec succès', type: [Tag] })
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un tag par son ID' })
  @ApiParam({ name: 'id', description: 'ID du tag', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tag récupéré avec succès', type: Tag })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tag non trouvé' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un tag' })
  @ApiParam({ name: 'id', description: 'ID du tag', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tag mis à jour avec succès', type: Tag })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tag non trouvé' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Tag déjà existant' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un tag' })
  @ApiParam({ name: 'id', description: 'ID du tag', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tag supprimé avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tag non trouvé' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tagsService.remove(id);
  }
}

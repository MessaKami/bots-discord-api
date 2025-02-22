import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle ressource' })
  @ApiResponse({ status: 201, description: 'La ressource a été créée avec succès.', type: Resource })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createResourceDto: CreateResourceDto): Promise<Resource> {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les ressources' })
  @ApiResponse({ status: 200, description: 'Liste des ressources récupérée avec succès.', type: [Resource] })
  findAll(): Promise<Resource[]> {
    return this.resourcesService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Récupérer une ressource par son UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID de la ressource' })
  @ApiResponse({ status: 200, description: 'La ressource a été trouvée.', type: Resource })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Resource> {
    return this.resourcesService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Mettre à jour une ressource' })
  @ApiParam({ name: 'uuid', description: 'UUID de la ressource' })
  @ApiResponse({ status: 200, description: 'La ressource a été mise à jour.', type: Resource })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    return this.resourcesService.update(uuid, updateResourceDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Supprimer une ressource' })
  @ApiParam({ name: 'uuid', description: 'UUID de la ressource' })
  @ApiResponse({ status: 200, description: 'La ressource a été supprimée.' })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.resourcesService.remove(uuid);
  }
} 
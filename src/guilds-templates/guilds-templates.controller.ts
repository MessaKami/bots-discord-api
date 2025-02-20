import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { GuildsTemplatesService } from './guilds-templates.service';
import { CreateGuildTemplateDto } from './dto/create-guild-template.dto';
import { UpdateGuildTemplateDto } from './dto/update-guild-template.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GuildTemplate } from './entities/guild-template.entity';

@ApiTags('guilds-templates')
@Controller('guilds-templates')
export class GuildsTemplatesController {
  constructor(private readonly guildsTemplatesService: GuildsTemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau template de serveur' })
  @ApiResponse({ status: 201, description: 'Le template a été créé avec succès.', type: GuildTemplate })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createGuildTemplateDto: CreateGuildTemplateDto) {
    return this.guildsTemplatesService.create(createGuildTemplateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les templates de serveur' })
  @ApiResponse({ status: 200, description: 'Liste des templates récupérée avec succès.', type: [GuildTemplate] })
  findAll() {
    return this.guildsTemplatesService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Récupérer un template de serveur par son UUID' })
  @ApiResponse({ status: 200, description: 'Le template a été trouvé.', type: GuildTemplate })
  @ApiResponse({ status: 404, description: 'Template non trouvé' })
  findOne(@Param('uuid') uuid: string) {
    return this.guildsTemplatesService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Mettre à jour un template de serveur' })
  @ApiResponse({ status: 200, description: 'Le template a été mis à jour avec succès.', type: GuildTemplate })
  @ApiResponse({ status: 404, description: 'Template non trouvé' })
  async update(@Param('uuid') uuid: string, @Body() updateGuildTemplateDto: UpdateGuildTemplateDto) {
    const guildTemplate = await this.guildsTemplatesService.update(uuid, updateGuildTemplateDto);
    if (!guildTemplate) {
      throw new NotFoundException(`Guild template with UUID "${uuid}" not found`);
    }
    return guildTemplate;
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Supprimer un template de serveur' })
  @ApiResponse({ status: 200, description: 'Le template a été supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Template non trouvé' })
  remove(@Param('uuid') uuid: string) {
    return this.guildsTemplatesService.remove(uuid);
  }
}

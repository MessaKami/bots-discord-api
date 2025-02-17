import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { GuildsTemplatesService } from './guilds-templates.service';
import { CreateGuildTemplateDto } from './dto/create-guild-template.dto';
import { UpdateGuildTemplateDto } from './dto/update-guild-template.dto';

@Controller('guilds-templates')
export class GuildsTemplatesController {
  constructor(private readonly guildsTemplatesService: GuildsTemplatesService) {}

  @Post()
  create(@Body() createGuildTemplateDto: CreateGuildTemplateDto) {
    return this.guildsTemplatesService.create(createGuildTemplateDto);
  }

  @Get()
  findAll() {
    return this.guildsTemplatesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.guildsTemplatesService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateGuildTemplateDto: UpdateGuildTemplateDto) {
    const guildTemplate = await this.guildsTemplatesService.update(uuid, updateGuildTemplateDto);
    if (!guildTemplate) {
      throw new NotFoundException(`Guild template with UUID "${uuid}" not found`);
    }
    return guildTemplate;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.guildsTemplatesService.remove(uuid);
  }
}

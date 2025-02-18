import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildService: GuildsService) {}

  @Post()
  create(@Body() createGuildDto: CreateGuildDto) {
    return this.guildService.create(createGuildDto);
  }

  @Get()
  findAll() {
    return this.guildService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.guildService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateGuildDto: UpdateGuildDto) {
    const guild = await this.guildService.update(uuid, updateGuildDto);
    if (!guild) {
      throw new NotFoundException(`Guild with UUID "${uuid}" not found`);
    }
    return guild;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.guildService.remove(uuid);
  }
}

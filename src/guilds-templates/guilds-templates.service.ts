import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGuildTemplateDto } from './dto/create-guild-template.dto';
import { UpdateGuildTemplateDto } from './dto/update-guild-template.dto';
import { GuildTemplate } from './entities/guild-template.entity';

@Injectable()
export class GuildsTemplatesService {
  constructor(
    @InjectRepository(GuildTemplate)
    private guildTemplateRepository: Repository<GuildTemplate>,
  ) {}

  create(createGuildTemplateDto: CreateGuildTemplateDto) {
    const guildTemplate = this.guildTemplateRepository.create(createGuildTemplateDto);
    return this.guildTemplateRepository.save(guildTemplate);
  }

  findAll() {
    return this.guildTemplateRepository.find();
  }

  findOne(uuid: string) {
    return this.guildTemplateRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updateGuildTemplateDto: UpdateGuildTemplateDto) {
    const guildTemplate = await this.guildTemplateRepository.findOneBy({ uuid });
    if (!guildTemplate) {
      return null;
    }
    
    // Mise à jour des champs autorisés uniquement
    const { name, description, configuration } = updateGuildTemplateDto;
    if (name !== undefined) guildTemplate.name = name;
    if (description !== undefined) guildTemplate.description = description;
    if (configuration !== undefined) guildTemplate.configuration = configuration;
    
    guildTemplate.updatedAt = new Date();
    return this.guildTemplateRepository.save(guildTemplate);
  }

  remove(uuid: string) {
    return this.guildTemplateRepository.delete({ uuid });
  }
}

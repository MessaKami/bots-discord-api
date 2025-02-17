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
    Object.assign(guildTemplate, updateGuildTemplateDto);
    return this.guildTemplateRepository.save(guildTemplate);
  }

  remove(uuid: string) {
    return this.guildTemplateRepository.delete({ uuid });
  }
}

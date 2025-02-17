import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildsTemplatesService } from './guilds-templates.service';
import { GuildsTemplatesController } from './guilds-templates.controller';
import { GuildTemplate } from './entities/guild-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuildTemplate])],
  controllers: [GuildsTemplatesController],
  providers: [GuildsTemplatesService],
})
export class GuildsTemplatesModule {}

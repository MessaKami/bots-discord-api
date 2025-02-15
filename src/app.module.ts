import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GuildModule } from './guilds/guilds.module';
import { CampusModule } from './campuses/campuses.module';
import { MembersInformationsModule } from './members-informations/members-informations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GuildModule,
    CampusModule,
    MembersInformationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

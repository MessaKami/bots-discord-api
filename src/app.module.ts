import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

// Modules de l'application
import { GuildModule } from './guilds/guilds.module';
import { CampusModule } from './campuses/campuses.module';
import { ModeratorActionsModule } from './moderator-actions/moderator-actions.module';
import { MembersInformationsModule } from './members-informations/members-informations.module';
import { CategoriesModule } from './categories/categories.module';

/**
 * Module principal de l'application
 * 
 * Ce module importe et configure :
 * - La connexion à la base de données via TypeORM
 * - Les modules fonctionnels de l'application
 */
@Module({
  imports: [
    // Configuration de la base de données
    TypeOrmModule.forRoot(typeOrmConfig),

    // Modules fonctionnels
    GuildModule,
    CampusModule,
    ModeratorActionsModule,
    MembersInformationsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

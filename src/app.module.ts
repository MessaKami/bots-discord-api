import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesModule } from './resources/resources.module';
import { ReportsModule } from './reports/reports.module';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { loggerConfig } from './config/logger.config';
import { GuildModule } from './guilds/guilds.module';
import { CampusModule } from './campuses/campuses.module';
import { GuildsTemplatesModule } from './guilds-templates/guilds-templates.module';
import { ModeratorActionsModule } from './moderator-actions/moderator-actions.module';
import { MembersInformationsModule } from './members-informations/members-informations.module';
import { CategoriesModule } from './categories/categories.module';
import { AnswersModule } from './answers/answers.module';
import { RolesModule } from './roles/roles.module';
import { MembersModule } from './members/members.module';
import { XpTransactionsModule } from './xp-transactions/xp-transactions.module';
import { QuestionsModule } from './questions/questions.module';
import { IdentificationRequestsModule } from './identification-requests/identification-requests.module';
import { DashboardAccountModule } from './dashboard-accounts/dashboard-accounts.module';

/**
 * Module principal de l'application
 * 
 * Ce module importe et configure :
 * - La connexion à la base de données via TypeORM
 * - Le système de logging via Pino
 * - Les modules fonctionnels de l'application
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ResourcesModule,
    LoggerModule.forRoot(loggerConfig),
    GuildModule,
    CampusModule,
    GuildsTemplatesModule,
    ModeratorActionsModule,
    MembersInformationsModule,
    CategoriesModule,
    AnswersModule,
    RolesModule,
    MembersModule,
    XpTransactionsModule,
    QuestionsModule,
    IdentificationRequestsModule,
    DashboardAccountModule,
    ReportsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('AppModule');
  }

  onModuleInit() {
    this.logger.info('Application started 🚀');
  }
}

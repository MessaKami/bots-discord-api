import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesModule } from './resources/resources.module';
import { ReportsModule } from './reports/reports.module';
import { typeOrmConfig } from './config/typeorm.config';

/**
 * Module principal de l'application
 * 
 * Ce module importe et configure :
 * - La connexion à la base de données via TypeORM
 * - Les modules fonctionnels de l'application
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ResourcesModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

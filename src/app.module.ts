import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesModule } from './resources/resources.module';
import { Resource } from './resources/entities/resource.entity';

/**
 * Module principal de l'application
 * 
 * Ce module importe et configure :
 * - La connexion à la base de données via TypeORM
 * - Les modules fonctionnels de l'application
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'discord_bot',
      entities: [Resource],
      synchronize: true,
    }),
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

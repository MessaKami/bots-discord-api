import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampusesService } from './campuses.service';
import { CampusesController } from './campuses.controller';
import { Campus } from './entities/campus.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campus]), RolesModule],
  controllers: [CampusesController],
  providers: [CampusesService],
})
export class CampusesModule {}

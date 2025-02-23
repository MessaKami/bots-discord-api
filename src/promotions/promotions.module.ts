import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { Promotion } from './entities/promotion.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), RolesModule],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService]
})
export class PromotionsModule {} 
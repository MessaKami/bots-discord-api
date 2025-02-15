import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorActionsService } from './moderator-actions.service';
import { ModeratorActionsController } from './moderator-actions.controller';
import { ModeratorAction } from './entities/moderator-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModeratorAction])],
  controllers: [ModeratorActionsController],
  providers: [ModeratorActionsService],
  exports: [ModeratorActionsService],
})
export class ModeratorActionsModule {}

import { Module } from '@nestjs/common';
import { ModeratorActionsService } from './moderator-actions.service';
import { ModeratorActionsController } from './moderator-actions.controller';

@Module({
  controllers: [ModeratorActionsController],
  providers: [ModeratorActionsService],
})
export class ModeratorActionsModule {}

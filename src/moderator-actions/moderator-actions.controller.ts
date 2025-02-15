import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeratorActionsService } from './moderator-actions.service';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';

@Controller('moderator-actions')
export class ModeratorActionsController {
  constructor(private readonly moderatorActionsService: ModeratorActionsService) {}

  @Post()
  create(@Body() createModeratorActionDto: CreateModeratorActionDto) {
    return this.moderatorActionsService.create(createModeratorActionDto);
  }

  @Get()
  findAll() {
    return this.moderatorActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorActionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeratorActionDto: UpdateModeratorActionDto) {
    return this.moderatorActionsService.update(+id, updateModeratorActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorActionsService.remove(+id);
  }
}

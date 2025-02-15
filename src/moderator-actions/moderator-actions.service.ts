import { Injectable } from '@nestjs/common';
import { CreateModeratorActionDto } from './dto/create-moderator-action.dto';
import { UpdateModeratorActionDto } from './dto/update-moderator-action.dto';

@Injectable()
export class ModeratorActionsService {
  create(createModeratorActionDto: CreateModeratorActionDto) {
    return 'This action adds a new moderatorAction';
  }

  findAll() {
    return `This action returns all moderatorActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moderatorAction`;
  }

  update(id: number, updateModeratorActionDto: UpdateModeratorActionDto) {
    return `This action updates a #${id} moderatorAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} moderatorAction`;
  }
}

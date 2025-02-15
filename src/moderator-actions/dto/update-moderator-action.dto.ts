import { PartialType } from '@nestjs/mapped-types';
import { CreateModeratorActionDto } from './create-moderator-action.dto';

export class UpdateModeratorActionDto extends PartialType(CreateModeratorActionDto) {}

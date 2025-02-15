import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum ActionType {
  BAN = 'ban',
  WARN = 'warn',
  MUTE = 'mute',
  KICK = 'kick',
  CONTENT_DELETION = 'content_deletion',
}

export class CreateModeratorActionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(ActionType)
  actionType: ActionType;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

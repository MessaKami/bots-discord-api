import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDiscordUserDto } from './create-discord-user.dto';

export class UpdateDiscordUserDto extends PartialType(
  OmitType(CreateDiscordUserDto, ['uuid_discord'] as const),
) {} 
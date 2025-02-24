import { IsString, MaxLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateCampusDto extends PickType(PickableDiscordUUIDFields, [
  'uuidGuild'
]) {
  @ApiProperty({
    description: 'Nom du campus',
    example: 'Simplon Paris',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  name: string;

  uuidGuild: string;
}

import { IsString, IsDate, MaxLength } from 'class-validator';
import { ApiProperty, PickType, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreatePromotionDto extends PickType(IntersectionType(PickableDiscordUUIDFields, PickableInternUUIDFields), [
  'uuidGuild',
  'uuidCourse'
]) {

  @ApiProperty({
    description: 'Nom de la promotion',
    example: 'Développeur Web 2024',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Date de début de la promotion',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la promotion',
    example: '2024-12-31T23:59:59.999Z'
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  uuidGuild: string;
  uuidCourse: string;
} 
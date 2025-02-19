import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampusDto {

  @ApiProperty({
    description: 'Nom du campus',
    example: 'Simplon Paris',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  name: string;
}

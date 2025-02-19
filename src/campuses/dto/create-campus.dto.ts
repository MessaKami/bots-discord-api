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

  @ApiProperty({
    description: 'Adresse du campus',
    example: '55 Rue de Vincennes, 93100 Montreuil',
    maxLength: 200,
    required: false
  })
  @IsString()
  @MaxLength(200)
  address?: string;

}

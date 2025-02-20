import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class PickableDtoFields {

    @ApiProperty({
        description: 'Nom de la ressource',
        example: 'Idetaka',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50)
    name: string;

}
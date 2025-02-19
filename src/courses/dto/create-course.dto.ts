import { IsString, IsNotEmpty, MinLength, IsUUID, IsBoolean, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty({
        description: 'Identifiant unique de la formation',
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    uuidCourse: string;

    @ApiProperty({
        description: 'Le nom de la formation',
        type: String,
        example: 'cda-vals-p4',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z0-9-]+$/) 
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Si la formation est certifiante',
        type: String,
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    isCertified: boolean;
}
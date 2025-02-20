import { IsString, IsNotEmpty, MinLength, IsUUID, IsBoolean, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty({
        description: 'Le nom de la formation',
        type: String,
        example: 'cda-vals-p4',
        minLength: 3
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
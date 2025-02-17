import { IsString, IsEmail, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateDashboardAccountDto {
    // Swagger
    // @ApiProperty({
    //     description: 'Identifiant unique du compte du dashboard',
    //     type: String,
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    // })
    uuidDashboardAccount: string;

    // Swagger
    // @ApiProperty({
    //     description: 'Email associé au compte du dashboard',
    //     type: String,
    //     example: 'test@example.com',
    // })
    @IsEmail()
    email: string;

    // Swagger
    // @ApiProperty({
    //     description: 'Mot de passe associé au compte du dashboard',
    //     type: String,
    //     example: 'password123',
    // })
    @IsString()
    @MinLength(8)
    password: string;
}
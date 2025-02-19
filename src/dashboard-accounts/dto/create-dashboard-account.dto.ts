import { IsString, IsEmail, MinLength, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDashboardAccountDto {
    @ApiProperty({
        description: 'Identifiant unique du compte du dashboard',
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    uuidDashboardAccount: string;


    @ApiProperty({
        description: 'Email associé au compte du dashboard',
        type: String,
        example: 'test@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Mot de passe associé au compte du dashboard',
        type: String,
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
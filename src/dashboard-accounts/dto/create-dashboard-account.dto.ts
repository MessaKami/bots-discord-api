import { IsString, IsEmail, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateDashboardAccountDto {
    @ApiProperty({
        description: 'Identifiant unique du compte du dashboard',
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    uuidDashboardAccount: string;

    @ApiProperty({
        description: 'Email associé au compte du dashboard',
        type: String,
        example: 'test@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Mot de passe associé au compte du dashboard',
        type: String,
        example: 'password123',
    })
    @IsString()
    @MinLength(8)
    password: string;
    
    @ApiProperty({
        description: 'Date de création du compte',
        type: String,
        format: 'date-time',
        example: '2025-01-01T00:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsString()
    createdAt: Timestamp;

    @ApiProperty({
        description: 'Date de mise à jour du compte',
        type: String,
        format: 'date-time',
        example: '2025-01-01T00:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsString()
    updatedAt: Timestamp;
}
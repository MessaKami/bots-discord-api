import { IsString, IsEmail, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateDashboardAccountDto {
    uuidDashboardAccount: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
    
    @IsOptional()
    @IsString()
    createdAt: Timestamp;

    @IsOptional()
    @IsString()
    updatedAt: Timestamp;
}
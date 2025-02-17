import { IsString, IsEmail, IsOptional, MinLength, IsBoolean } from 'class-validator';

export class CreateDashboardAccountDto {
    uuidDashboardAccount: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
    
    @IsOptional()
    @IsString()
    createdAt: Date;

    @IsOptional()
    @IsString()
    updatedAt: Date;
}
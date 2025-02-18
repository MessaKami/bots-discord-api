import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportCategory } from '../entities/report.entity';

export class CreateReportDto {
  @ApiProperty({
    description: 'Catégorie du rapport',
    enum: ReportCategory,
    example: ReportCategory.SPAM
  })
  @IsEnum(ReportCategory)
  @IsNotEmpty()
  category: ReportCategory;

  @ApiProperty({
    description: 'Raison du rapport',
    maxLength: 50,
    example: 'Contenu inapproprié'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  reason: string;

  @ApiProperty({
    description: 'Statut du rapport',
    maxLength: 50,
    example: 'pending'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;
} 
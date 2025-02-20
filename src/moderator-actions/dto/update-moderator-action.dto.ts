import { PartialType } from '@nestjs/mapped-types';
import { CreateModeratorActionDto, ActionType } from './create-moderator-action.dto';
import { 
  IsOptional, 
  IsString, 
  IsEnum, 
  IsUUID, 
  Length, 
  Matches,
  IsISO8601,
  ValidateIf 
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO pour la mise à jour d'une action de modération
 * 
 * Hérite de CreateModeratorActionDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateModeratorActionDto extends PartialType(CreateModeratorActionDto) {
  @ApiPropertyOptional({
    description: 'ID de l\'utilisateur ciblé par l\'action',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Type d\'action de modération',
    enum: ActionType,
    example: ActionType.BAN
  })
  @IsOptional()
  @IsEnum(ActionType, { 
    message: `Le type d'action doit être l'un des suivants: ${Object.values(ActionType).join(', ')}`
  })
  actionType?: ActionType;

  @ApiPropertyOptional({
    description: 'Raison de l\'action de modération',
    example: 'Violation des règles de la communauté',
    minLength: 10,
    maxLength: 500
  })
  @IsOptional()
  @IsString({ message: 'La raison doit être une chaîne de caractères' })
  @Length(10, 500, { 
    message: 'La raison doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  reason?: string;

  @ApiPropertyOptional({
    description: 'Durée de la sanction (format: 1d, 2h, 30m, etc.)',
    example: '24h',
    pattern: '^(\\d+)[mhdw]$'
  })
  @IsOptional()
  @ValidateIf((o) => o.actionType === ActionType.BAN || o.actionType === ActionType.MUTE)
  @IsString({ message: 'La durée doit être une chaîne de caractères' })
  @Matches(/^(\d+)[mhdw]$/, { 
    message: 'La durée doit être au format: [nombre][unité] (ex: 30m, 24h, 7d, 1w)'
  })
  duration?: string;

  @ApiPropertyOptional({
    description: 'Date d\'expiration de la sanction',
    example: '2024-12-31T23:59:59Z',
    format: 'date-time'
  })
  @IsOptional()
  @ValidateIf((o) => o.actionType === ActionType.BAN || o.actionType === ActionType.MUTE)
  @IsISO8601({ strict: true }, { 
    message: 'La date d\'expiration doit être au format ISO 8601 (ex: 2024-12-31T23:59:59Z)'
  })
  expiresAt?: string;

  @ApiPropertyOptional({
    description: 'Notes additionnelles',
    example: 'Récidive après deux avertissements',
    maxLength: 1000
  })
  @IsOptional()
  @IsString({ message: 'Les notes doivent être une chaîne de caractères' })
  @Length(0, 1000, { 
    message: 'Les notes ne doivent pas dépasser $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  notes?: string;
}

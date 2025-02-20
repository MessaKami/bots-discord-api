import { 
  IsString, 
  IsNotEmpty, 
  IsEnum, 
  IsOptional, 
  IsUUID, 
  Length, 
  Matches,
  IsISO8601,
  ValidateIf
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Types d'actions de modération possibles
 */
export enum ActionType {
  BAN = 'ban',           // Bannissement d'un utilisateur
  WARN = 'warn',         // Avertissement
  MUTE = 'mute',         // Mise en sourdine
  KICK = 'kick',         // Expulsion
  DELETE_MESSAGE = 'delete_message',  // Suppression de message
  DELETE_THREAD = 'delete_thread',    // Suppression de fil de discussion
}

/**
 * DTO pour la création d'une action de modération
 * 
 * Ce DTO définit la structure et les validations pour les données
 * nécessaires à la création d'une nouvelle action de modération.
 */
export class CreateModeratorActionDto {
  @ApiProperty({
    description: 'ID de l\'utilisateur ciblé par l\'action',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsNotEmpty({ message: 'L\'ID de l\'utilisateur est requis' })
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId: string;

  @ApiProperty({
    description: 'Type d\'action de modération',
    enum: ActionType,
    example: ActionType.BAN
  })
  @IsNotEmpty({ message: 'Le type d\'action est requis' })
  @IsEnum(ActionType, { 
    message: `Le type d'action doit être l'un des suivants: ${Object.values(ActionType).join(', ')}`
  })
  actionType: ActionType;

  @ApiProperty({
    description: 'Raison de l\'action de modération',
    example: 'Violation des règles de la communauté',
    minLength: 10,
    maxLength: 500
  })
  @IsNotEmpty({ message: 'La raison est requise' })
  @IsString({ message: 'La raison doit être une chaîne de caractères' })
  @Length(10, 500, { 
    message: 'La raison doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  reason: string;

  @ApiProperty({
    description: 'Durée de la sanction (format: 1d, 2h, 30m, etc.)',
    example: '24h',
    required: false,
    pattern: '^(\\d+)[mhdw]$'
  })
  @IsOptional()
  @ValidateIf((o) => o.actionType === ActionType.BAN || o.actionType === ActionType.MUTE)
  @IsString({ message: 'La durée doit être une chaîne de caractères' })
  @Matches(/^(\d+)[mhdw]$/, { 
    message: 'La durée doit être au format: [nombre][unité] (ex: 30m, 24h, 7d, 1w)'
  })
  duration?: string;

  /**
   * Date d'expiration de la sanction (optionnel)
   * @example "2024-12-31T23:59:59Z"
   */
  @IsOptional()
  @ValidateIf((o) => o.actionType === ActionType.BAN || o.actionType === ActionType.MUTE)
  @IsISO8601({ strict: true }, { 
    message: 'La date d\'expiration doit être au format ISO 8601 (ex: 2024-12-31T23:59:59Z)'
  })
  expiresAt?: string;

  @ApiProperty({
    description: 'Notes additionnelles',
    example: 'Récidive après deux avertissements',
    required: false,
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

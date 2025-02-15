import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUUID, Length, Matches } from 'class-validator';

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
  /**
   * ID de l'utilisateur ciblé par l'action
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsNotEmpty({ message: 'L\'ID de l\'utilisateur est requis' })
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId: string;

  /**
   * Type d'action de modération
   * @example "ban"
   */
  @IsNotEmpty({ message: 'Le type d\'action est requis' })
  @IsEnum(ActionType, { message: 'Le type d\'action doit être valide' })
  actionType: ActionType;

  /**
   * Raison de l'action de modération
   * @example "Violation des règles de la communauté"
   */
  @IsNotEmpty({ message: 'La raison est requise' })
  @IsString({ message: 'La raison doit être une chaîne de caractères' })
  @Length(10, 500, { message: 'La raison doit contenir entre 10 et 500 caractères' })
  reason: string;

  /**
   * Durée de la sanction (optionnel)
   * Format: 1d, 2h, 30m, etc.
   * @example "24h"
   */
  @IsOptional()
  @IsString({ message: 'La durée doit être une chaîne de caractères' })
  @Matches(/^(\d+)(m|h|d|w)$/, { 
    message: 'La durée doit être au format: [nombre][unité] (ex: 30m, 24h, 7d, 1w)'
  })
  duration?: string;

  /**
   * Notes additionnelles (optionnel)
   * @example "Récidive après deux avertissements"
   */
  @IsOptional()
  @IsString({ message: 'Les notes doivent être une chaîne de caractères' })
  @Length(0, 1000, { message: 'Les notes ne doivent pas dépasser 1000 caractères' })
  notes?: string;
}

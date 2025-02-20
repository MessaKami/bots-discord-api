import { IsString, IsNumber, Length, MaxLength, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


/**
 * Data Transfer Object pour la création d'une transaction XP
 * 
 * @class CreateXpTransactionDto
 * @description Ce DTO définit la structure et les validations pour les données
 * nécessaires à la création d'une nouvelle transaction XP dans le système.
 * Il est utilisé pour valider les entrées lors de la création d'une transaction XP.
 * 
 * @example
 * ```typescript
 * const transaction = new CreateXpTransactionDto();
 * transaction.userId = "123e4567-e89b-12d3-a456-426614174000";
 * transaction.amount = 100;
 * transaction.reason = "Participation active";
 * transaction.notes = "Aide exceptionnelle"; // Optionnel
 * ```
 * 
 * @see XpTransactionsService
 * @see XpTransactionsController
 */
export class CreateXpTransactionDto {
  @ApiProperty({
    description: 'UUID du membre concerné par la transaction (UUID v4 valide)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  /**
   * Identifiant unique de l'utilisateur concerné par la transaction
   * 
   * @property {string} userId
   * @description Doit être un UUID v4 valide de 36 caractères
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   * 
   * @throws {ValidationError} Si l'userId n'est pas une chaîne de 36 caractères
   * 
   * @validations
   * - IsString() : Doit être une chaîne de caractères
   * - Length(36) : Doit faire exactement 36 caractères
   */
  @IsString()
  @Length(36)
  userId: string;

  @ApiProperty({
    description: 'Montant de points d\'expérience (XP) à attribuer ou retirer (entre -1000 et 1000)',
    example: 100,
    minimum: -1000,
    maximum: 1000
  })
  /**
   * Montant de points d'expérience (XP) à attribuer ou retirer
   * 
   * @property {number} amount
   * @description Le montant peut être positif (gain d'XP) ou négatif (perte d'XP)
   * 
   * @example 100
   * 
   * @throws {ValidationError} Si amount n'est pas un nombre ou est hors limites
   * 
   * @validations
   * - IsNumber() : Doit être un nombre
   * - Min(-1000) : Ne peut pas être inférieur à -1000
   * - Max(1000) : Ne peut pas être supérieur à 1000
   */
  @IsNumber()
  @Min(-1000)
  @Max(1000)
  amount: number;

  @ApiProperty({
    description: 'Raison justifiant la transaction XP (max 200 caractères)',
    example: 'Participation active dans le salon d\'entraide',
    maxLength: 200
  })
  /**
   * Raison justifiant la transaction XP
   * 
   * @property {string} reason
   * @description Explication concise de la raison de l'attribution ou du retrait d'XP
   * 
   * @example "Participation active dans le salon d'entraide"
   * 
   * @throws {ValidationError} Si reason n'est pas une chaîne ou dépasse 200 caractères
   * 
   * @validations
   * - IsString() : Doit être une chaîne de caractères
   * - MaxLength(200) : Ne peut pas dépasser 200 caractères
   */
  @IsString()
  @MaxLength(200)
  reason: string;

  @ApiProperty({
    description: 'Notes additionnelles sur la transaction (optionnel, max 500 caractères)',
    example: 'Aide exceptionnelle sur un projet complexe',
    required: false,
    maxLength: 500
  })
  /**
   * Notes additionnelles sur la transaction (optionnel)
   * 
   * @property {string} notes
   * @description Informations complémentaires sur la transaction
   * Ce champ est optionnel et peut être omis
   * 
   * @example "Aide exceptionnelle sur un projet complexe"
   * 
   * @throws {ValidationError} Si notes est présent mais n'est pas une chaîne ou dépasse 500 caractères
   * 
   * @validations
   * - IsOptional() : Le champ est optionnel
   * - IsString() : Si présent, doit être une chaîne de caractères
   * - MaxLength(500) : Si présent, ne peut pas dépasser 500 caractères
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

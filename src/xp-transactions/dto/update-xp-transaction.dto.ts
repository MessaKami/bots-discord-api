import { PartialType } from '@nestjs/mapped-types';
import { CreateXpTransactionDto } from './create-xp-transaction.dto';
import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  IsUUID, 
  Min,
  Max,
  Length
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO pour la mise à jour d'une transaction XP
 * 
 * Hérite de CreateXpTransactionDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateXpTransactionDto extends PartialType(CreateXpTransactionDto) {
  /**
   * ID de l'utilisateur concerné par la transaction
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId?: string;

  /**
   * Montant de XP de la transaction
   * @example 100
   */
  @IsOptional()
  @IsNumber({}, { message: 'Le montant de XP doit être un nombre' })
  @Min(-1000, { message: 'Le montant de XP ne peut pas être inférieur à -1000' })
  @Max(1000, { message: 'Le montant de XP ne peut pas être supérieur à 1000' })
  amount?: number;

  /**
   * Raison de la transaction XP
   * @example "Participation active dans le salon d'entraide"
   */
  @IsOptional()
  @IsString({ message: 'La raison doit être une chaîne de caractères' })
  @Length(10, 200, { 
    message: 'La raison doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  reason?: string;

  /**
   * Notes additionnelles
   * @example "Aide exceptionnelle sur un projet complexe"
   */
  @IsOptional()
  @IsString({ message: 'Les notes doivent être une chaîne de caractères' })
  @Length(0, 500, { 
    message: 'Les notes ne doivent pas dépasser $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  notes?: string;
}

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
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour la mise à jour d'une transaction XP
 * 
 * Hérite de CreateXpTransactionDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateXpTransactionDto extends PartialType(CreateXpTransactionDto) {
  @ApiProperty({
    description: 'UUID du membre concerné par la transaction (UUID v4 valide)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId?: string;

  @ApiProperty({
    description: 'Montant de points d\'expérience (XP) à attribuer ou retirer (entre -1000 et 1000)',
    example: 100,
    minimum: -1000,
    maximum: 1000,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'Le montant de XP doit être un nombre' })
  @Min(-1000, { message: 'Le montant de XP ne peut pas être inférieur à -1000' })
  @Max(1000, { message: 'Le montant de XP ne peut pas être supérieur à 1000' })
  amount?: number;

  @ApiProperty({
    description: 'Raison justifiant la transaction XP (entre 10 et 200 caractères)',
    example: 'Participation active dans le salon d\'entraide',
    minLength: 10,
    maxLength: 200,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La raison doit être une chaîne de caractères' })
  @Length(10, 200, { 
    message: 'La raison doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  reason?: string;

  @ApiProperty({
    description: 'Notes additionnelles sur la transaction (optionnel, max 500 caractères)',
    example: 'Aide exceptionnelle sur un projet complexe',
    maxLength: 500,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Les notes doivent être une chaîne de caractères' })
  @Length(0, 500, { 
    message: 'Les notes ne doivent pas dépasser $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  notes?: string;
}

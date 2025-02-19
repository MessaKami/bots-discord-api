import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsString, IsOptional, Length, IsIn, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO pour la mise à jour d'un commentaire
 * 
 * Hérite de CreateCommentDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  /**
   * Nouveau contenu du commentaire
   * @example "Mise à jour : Excellent travail sur ce projet !"
   */
  @IsOptional()
  @IsString({ message: 'Le contenu doit être une chaîne de caractères' })
  @Length(1, 1000, { 
    message: 'Le contenu doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  content?: string;

  /**
   * Nouveau statut du commentaire
   * @example "inactive"
   */
  @IsOptional()
  @IsString({ message: 'Le statut doit être une chaîne de caractères' })
  @IsIn(['active', 'inactive', 'deleted'], { 
    message: 'Le statut doit être soit active, inactive ou deleted'
  })
  comment_status?: string;

  /**
   * Nouvel ID de la ressource
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de la ressource doit être un UUID valide' })
  resource_uuid?: string;

  /**
   * Nouvel ID de l'utilisateur propriétaire
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur propriétaire doit être un UUID valide' })
  user_uuid?: string;
}

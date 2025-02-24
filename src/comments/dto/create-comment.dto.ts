import { IsString, Length, IsUUID, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Data Transfer Object pour la création d'un commentaire
 * 
 * @class CreateCommentDto
 * @description Ce DTO définit la structure et les validations pour les données
 * nécessaires à la création d'un nouveau commentaire dans le système.
 */
export class CreateCommentDto {
  /**
   * Contenu du commentaire
   * @example "Très bon travail sur ce projet !"
   */
  @IsString({ message: 'Le contenu doit être une chaîne de caractères' })
  @Length(1, 1000, { 
    message: 'Le contenu doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  content: string;

  /**
   * Statut du commentaire
   * @example "active"
   */
  @IsString({ message: 'Le statut doit être une chaîne de caractères' })
  @IsIn(['active', 'inactive', 'deleted'], { 
    message: 'Le statut doit être soit active, inactive ou deleted'
  })
  comment_status: string;

  /**
   * ID de l'utilisateur qui crée le commentaire
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  uuidMember: string;

  /**
   * ID de la ressource concernée par le commentaire
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsUUID('4', { message: 'L\'ID de la ressource doit être un UUID valide' })
  resource_uuid: string;

  /**
   * ID de l'utilisateur propriétaire du commentaire
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur propriétaire doit être un UUID valide' })
  user_uuid: string;
}

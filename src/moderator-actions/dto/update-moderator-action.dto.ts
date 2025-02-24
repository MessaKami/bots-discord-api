import { PartialType } from '@nestjs/mapped-types';
import { CreateModeratorActionDto } from './create-moderator-action.dto';

/**
 * DTO pour la mise à jour d'une action de modération
 * 
 * Hérite de CreateModeratorActionDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateModeratorActionDto extends PartialType(CreateModeratorActionDto) {}

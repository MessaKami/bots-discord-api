import { PartialType } from '@nestjs/mapped-types';
import { CreateXpTransactionDto } from './create-xp-transaction.dto';

/**
 * DTO pour la mise à jour d'une transaction XP
 * 
 * Hérite de CreateXpTransactionDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateXpTransactionDto extends PartialType(CreateXpTransactionDto) {}

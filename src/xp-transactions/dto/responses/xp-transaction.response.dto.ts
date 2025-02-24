import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { XpTransactionType, XpTransactionSource, ReferenceType } from '../../entities/xp-transaction.entity';

export class XpTransactionMemberResponseDto {
  @ApiProperty({
    description: 'UUID du membre',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Expose()
  uuid_member: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur sur le serveur',
    example: 'User2'
  })
  @Expose()
  guild_username: string;

  @ApiProperty({
    description: 'Rôle dans la communauté',
    example: 'Member'
  })
  @Expose()
  community_role: string;

  // On exclut les autres champs du membre
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  level: number;

  @Exclude()
  status: string;

  @Exclude()
  uuid_discord: string;

  @Exclude()
  uuid_guild: string;

  @Exclude()
  xp: string;
}

export class XpTransactionResponseDto {
  @ApiProperty({
    description: 'UUID de la transaction XP',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @Expose()
  uuid_xp_transaction: string;

  @ApiProperty({
    description: 'Type de la transaction',
    enum: XpTransactionType,
    example: XpTransactionType.GAIN
  })
  @Expose()
  transaction_type: XpTransactionType;

  @ApiProperty({
    description: 'Source de la transaction',
    enum: XpTransactionSource,
    example: XpTransactionSource.VOTE
  })
  @Expose()
  source: XpTransactionSource;

  @ApiProperty({
    description: 'Valeur de la transaction XP',
    example: '100.00'
  })
  @Expose()
  transaction_value: string;

  @ApiProperty({
    description: 'Raison de la transaction',
    example: 'Vote positif sur une ressource'
  })
  @Expose()
  reason: string;

  @ApiProperty({
    description: 'Notes additionnelles',
    example: 'Ressource particulièrement utile',
    required: false
  })
  @Expose()
  notes?: string;

  @ApiProperty({
    description: 'Type de l\'objet référencé',
    enum: ReferenceType,
    example: ReferenceType.RESOURCE,
    required: false
  })
  @Expose()
  reference_type?: ReferenceType;

  @ApiProperty({
    description: 'UUID de l\'objet référencé',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @Expose()
  reference_uuid?: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-03-14T12:00:00Z'
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'Membre concerné par la transaction',
    type: () => XpTransactionMemberResponseDto
  })
  @Expose()
  @Type(() => XpTransactionMemberResponseDto)
  member: XpTransactionMemberResponseDto;
} 
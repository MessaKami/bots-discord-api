import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReportResponseDto } from '../../../reports/dto/responses/report.response.dto';

export class ResourceCreatorResponseDto {
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

export class ResourceResponseDto {
  @ApiProperty({
    description: 'UUID de la ressource',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Expose()
  uuid_resource: string;

  @ApiProperty({
    description: 'Titre de la ressource',
    example: 'Guide de démarrage'
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Description de la ressource',
    example: 'Un guide complet pour démarrer avec le bot'
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Contenu de la ressource',
    example: 'Voici les étapes pour configurer le bot...'
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: 'Statut de la ressource',
    example: 'active'
  })
  @Expose()
  status: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-22T12:00:00Z'
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'Créateur de la ressource',
    type: () => ResourceCreatorResponseDto
  })
  @Expose()
  @Type(() => ResourceCreatorResponseDto)
  creator: ResourceCreatorResponseDto;

  @ApiProperty({
    description: 'Signalements de la ressource',
    type: () => [ReportResponseDto]
  })
  @Expose()
  @Type(() => ReportResponseDto)
  reports: ReportResponseDto[];

  // On exclut les champs non nécessaires
  @Exclude()
  updated_at: Date;
} 
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PickableInternUUIDFields {

  @ApiProperty({
    description: 'Identifiant unique du membre',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })  
  @IsUUID()
  uuid_member: string;

  @ApiProperty({
    description: 'Identifiant unique des informations du membre',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_member_infos: string;

  @ApiProperty({
    description: 'Identifiant unique du compte du dashboard',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_dashboard_account: string;

  @ApiProperty({
    description: 'Identifiant unique de la demande d\'identification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_identification_request: string;

  @ApiProperty({
    description: 'Identifiant unique du template de serveur',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_guild_template: string;

  @ApiProperty({
    description: 'Identifiant unique du campus',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_campus: string;

  @ApiProperty({
    description: 'Identifiant unique de la formation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_course: string;

  @ApiProperty({
    description: 'Identifiant unique de la promotion',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_promotion: string;

  @ApiProperty({
    description: 'Identifiant unique de la ressource',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_resource: string;

  @ApiProperty({
    description: 'Identifiant unique du commentaire',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_comment: string;

  @ApiProperty({
    description: 'Identifiant unique de la transaction',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_xp_transaction: string;

  @ApiProperty({
    description: 'Identifiant unique du vote',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_vote: string;

  @ApiProperty({
    description: 'Identifiant unique du rapport',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_report: string;

  @ApiProperty({
    description: 'Identifiant unique du membre qui a fait le signalement',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_reporter: string;

  @ApiProperty({
    description: 'Identifiant unique du membre signalé',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_reported_member: string;

  @ApiProperty({
    description: 'Identifiant unique de l\'action de modération',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_moderation_action: string;

  @ApiProperty({
    description: 'Identifiant unique de la question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_question: string;

  @ApiProperty({
    description: 'Identifiant unique de la résponse',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_answer: string;

  @ApiProperty({
    description: 'Identifiant unique du sondage',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_poll: string;

  @ApiProperty({
    description: 'Identifiant unique du template du sondage',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  uuid_poll_template: string;

}
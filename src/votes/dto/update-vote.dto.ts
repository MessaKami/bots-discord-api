import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID, IsDateString, IsBoolean } from 'class-validator';
import { CreateVoteDto } from './create-vote.dto';

export class UpdateVoteDto {
  @ApiProperty({
    description: 'Type de vote (upvote ou downvote)',
    enum: ['upvote', 'downvote'],
    example: 'upvote',
    required: false
  })
  @IsOptional()
  @IsEnum(['upvote', 'downvote'], { message: 'Le type de vote doit être upvote ou downvote' })
  voteType?: 'upvote' | 'downvote';

  @ApiProperty({
    description: 'ID de l\'utilisateur qui vote',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId?: string;

  @ApiProperty({
    description: 'ID de l\'élément voté',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'élément doit être un UUID valide' })
  itemId?: string;

  @ApiProperty({
    description: 'État actif du vote',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Le statut actif doit être un booléen' })
  voteIsActive?: boolean;

  @ApiProperty({
    description: 'Date de mise à jour du vote',
    example: '2024-02-19T12:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'La date de mise à jour doit être une date valide' })
  updatedAt?: string;
}

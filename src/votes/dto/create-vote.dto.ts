import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({
    description: 'ID de l\'utilisateur qui vote',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty({ message: 'L\'ID de l\'utilisateur est requis' })
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur doit être un UUID valide' })
  userId: string;

  @ApiProperty({
    description: 'ID de l\'élément voté',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty({ message: 'L\'ID de l\'élément est requis' })
  @IsUUID('4', { message: 'L\'ID de l\'élément doit être un UUID valide' })
  itemId: string;

  @ApiProperty({
    description: 'Type de vote (upvote ou downvote)',
    enum: ['upvote', 'downvote'],
    example: 'upvote'
  })
  @IsNotEmpty({ message: 'Le type de vote est requis' })
  @IsEnum(['upvote', 'downvote'], { message: 'Le type de vote doit être upvote ou downvote' })
  voteType: 'upvote' | 'downvote';

  @ApiProperty({
    description: 'Date de création du vote',
    example: '2024-02-19T12:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'La date de création doit être une date valide' })
  createdAt?: string;
}

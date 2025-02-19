import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({
    description: 'Type de vote (upvote ou downvote)',
    enum: ['upvote', 'downvote'],
    example: 'upvote'
  })
  @IsNotEmpty({ message: 'Le type de vote est requis' })
  @IsEnum(['upvote', 'downvote'], { message: 'Le type de vote doit être upvote ou downvote' })
  voteType: 'upvote' | 'downvote';
}

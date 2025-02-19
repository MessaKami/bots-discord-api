import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateVoteDto } from './create-vote.dto';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {
  @ApiProperty({
    description: 'État actif du vote',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Le statut actif doit être un booléen' })
  voteIsActive?: boolean;
}

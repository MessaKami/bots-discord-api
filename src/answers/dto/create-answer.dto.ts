import { IsString, IsBoolean, MaxLength, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Le contenu de la réponse',
    example: 'Paris',
    maxLength: 50,
    type: String
  })
  @IsString({message: 'Le contenu de la réponse doit être une chaîne de caractères'})
  @MaxLength(50, {message: 'Le contenu de la réponse ne doit pas dépasser 50 caractères'})
  content: string;

  @ApiProperty({
    description: 'Indique si la réponse fait partie d\'une question à choix multiples',
    example: true,
    type: Boolean
  })
  @IsBoolean({message: 'La réponse doit être un boolean'})
  isMultipleAnswer: boolean;

  @IsString()
  @Length(36, 36, {message: "L'UUID de la question doit être une chaîne de 36 caractères"})
  questionUuid: string;
}
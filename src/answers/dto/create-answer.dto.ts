import { IsString, IsBoolean, MaxLength, IsUUID, Length } from 'class-validator';

export class CreateAnswerDto {
  @IsString({message: 'Le contenu de la réponse doit être une chaîne de caractères'})
  @MaxLength(50, {message: 'Le contenu de la réponse ne doit pas dépasser 50 caractères'})
  content: string;

  @IsBoolean({message: 'La réponse doit être un boolean'})
  isMultipleAnswer: boolean;

  @IsString()
  @Length(36, 36, {message: "L'UUID de la question doit être une chaîne de 36 caractères"})
  questionUuid: string;
}
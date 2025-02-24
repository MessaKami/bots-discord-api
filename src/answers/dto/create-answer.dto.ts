import { IsString, MaxLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateAnswerDto extends PickType(PickableInternUUIDFields, [
  'uuidQuestion'
]) {
  @ApiProperty({
    description: 'Le contenu de la réponse',
    example: 'Paris',
    maxLength: 50,
    type: String
  })
  @IsString({message: 'Le contenu de la réponse doit être une chaîne de caractères'})
  @MaxLength(50, {message: 'Le contenu de la réponse ne doit pas dépasser 50 caractères'})
  content: string;
}
import { IsString, MaxLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateAnswerDto extends PickType(PickableInternUUIDFields, [
  'uuidQuestion'
]) {
  @ApiProperty({
    description: 'The content of the answer',
    example: 'Paris',
    maxLength: 50,
    type: String
  })
  @IsString({message: 'Answer content must be a string'})
  @MaxLength(50, {message: 'Answer content must not exceed 50 characters'})
  content: string;
}
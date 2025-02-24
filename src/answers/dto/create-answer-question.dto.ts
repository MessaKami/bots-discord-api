import { IntersectionType, PickType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateAnswerQuestionDto extends IntersectionType(
    CreateAnswerDto, 
    PickType(PickableInternUUIDFields, ['uuidQuestion']))
  {
}
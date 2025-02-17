import { MaxLength, IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @MaxLength(50)
  content: string;

  @IsBoolean()
  isMultipleAnswer: boolean;

  @IsString()
  @MaxLength(36)
  @MinLength(36)
  uuidPoll: string;
}
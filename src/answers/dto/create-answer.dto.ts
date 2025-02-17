import { IsString, IsBoolean, MaxLength, IsUUID, Length } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @MaxLength(50)
  content: string;

  @IsBoolean()
  isMultipleAnswer: boolean;

  @IsUUID()
  questionUuid: string;
}
import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}

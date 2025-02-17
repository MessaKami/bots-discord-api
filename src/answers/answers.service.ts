import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Question } from '../../questions/entities/question.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const question = await this.questionsRepository.findOneBy({ 
      uuid: createAnswerDto.questionUuid 
    });
    
    const answer = this.answersRepository.create({
      ...createAnswerDto,
      question
    });
    return this.answersRepository.save(answer);
  }

  findAll() {
    return this.answersRepository.find();
  }

  findOne(uuid: string) {
    return this.answersRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answersRepository.findOneBy({ uuid });
    if (!answer) {
      return null;
    }
    Object.assign(answer, updateAnswerDto);
    return this.answersRepository.save(answer);
  }

  remove(uuid: string) {
    return this.answersRepository.delete({ uuid });
  }
}

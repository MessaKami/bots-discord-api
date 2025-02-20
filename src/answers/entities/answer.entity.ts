import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';  
import { ApiProperty } from '@nestjs/swagger';

@Entity('answers')
export class Answer {
  @ApiProperty({
    description: 'Identifiant unique de la réponse',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    readOnly: true
  })
  @PrimaryGeneratedColumn('uuid', { name: 'uuid_answer' })
  uuid: string;

  @Column({ type: 'varchar', length: 50 })
  content: string;

  @Column({
    name: 'is_multiple_answer',
    type: 'boolean',
  })
  isMultipleAnswer: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

}

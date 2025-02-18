import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';  

@Entity('answers')
export class Answer {
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

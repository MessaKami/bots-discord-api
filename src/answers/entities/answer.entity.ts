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

  @ApiProperty({
    description: 'Le contenu de la réponse',
    example: 'Paris',
    maxLength: 50,
    type: String
  })
  @Column({ type: 'varchar', length: 50 })
  content: string;

  @ApiProperty({
    description: 'Indique si la réponse fait partie d\'une question à choix multiples',
    example: true,
    type: Boolean
  })
  @Column({
    name: 'is_multiple_answer',
    type: 'boolean',
  })
  isMultipleAnswer: boolean;

  @ApiProperty({
    description: 'La question associée à cette réponse',
    type: () => Question
  })
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

}

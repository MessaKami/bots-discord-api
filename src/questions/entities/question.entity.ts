import { Answer } from 'src/answers/entities/answer.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn('uuid', { name: 'question_id' })
    uuid: string;
    
    @Column()
    content: string;

    @Column()
    isMultipleAnswer: boolean;

    // @ManyToOne(() => Poll, (poll) => poll.questions)
    // uuidPoll: Poll;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    updatedAt: Date;
}
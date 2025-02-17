import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('questions')
export class Questions {
    @PrimaryGeneratedColumn('uuid', { name: 'question_id' })
    uuid: string;
    
    @Column()
    content: string;

    @Column()
    isMultipleAnswer: boolean;

    @ManyToOne(() => Poll, (poll) => poll.questions)
    uuidPoll: Poll;

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
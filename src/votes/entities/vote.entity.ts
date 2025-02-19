import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Entité représentant un vote dans le système
 */
@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn('uuid', { name: 'vote_uuid' })
  voteUuid: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId: string;

  @Column({ 
    name: 'vote_type',
    type: 'enum',
    enum: ['upvote', 'downvote'],
    nullable: false
  })
  voteType: 'upvote' | 'downvote';

  @CreateDateColumn({
    name: 'vote_created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  voteCreatedAt: Date;

  @UpdateDateColumn({
    name: 'vote_updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  voteUpdatedAt: Date;

  @Column({ 
    name: 'vote_is_active',
    type: 'boolean',
    default: true
  })
  voteIsActive: boolean;
}

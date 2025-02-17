import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('channels')
export class Channel {
  @PrimaryColumn('bigint', { name: 'channel_id' })
  uuid: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ name: 'channel_position' })
  channelPosition: number;

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
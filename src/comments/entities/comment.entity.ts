import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from '../../members/entities/member.entity';

@Entity('comments')
export class Comment {
  @PrimaryColumn('uuid', { name: 'comment_uuid' })
  uuid: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50 })
  comment_status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'comment_createdAt' })
  createdAt: Date;

  @Column('uuid')
  uuidMember: string;

  @Column('uuid')
  resource_uuid: string;

  @Column('uuid')
  user_uuid: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'uuidMember' })
  member: Member;
}

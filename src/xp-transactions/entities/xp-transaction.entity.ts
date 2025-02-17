import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from '../../members/entities/member.entity';

@Entity('xp_transactions')
export class XpTransaction {
  @PrimaryColumn('uuid', { name: 'xp_transaction_uuid' })
  uuid: string;

  @Column({ type: 'varchar', length: 50 })
  transaction_type: string;

  @Column({ type: 'integer' })
  transaction_value: number;

  @CreateDateColumn({ type: 'timestamp', name: 'transaction_createdAt' })
  createdAt: Date;

  @Column('uuid')
  uuid_member: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'uuid_member' })
  member: Member;
}

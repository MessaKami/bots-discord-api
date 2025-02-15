import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('guilds')
export class Guild {
  @PrimaryColumn('varchar', { name: 'uuid_guild' })
  uuid: string;

  @Column({ type: 'varchar', length: 50 }) 
  name: string;

  @Column({ name: 'member_count', type: 'int' })
  memberCount: number;

  @Column({ type: 'jsonb', nullable: true })
  configuration: Record<string, any>;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;
}

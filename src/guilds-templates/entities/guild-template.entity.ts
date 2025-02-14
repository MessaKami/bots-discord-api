import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guilds_templates')
export class GuildTemplate {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

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

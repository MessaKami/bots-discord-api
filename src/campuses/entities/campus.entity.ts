import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('campus')
export class Campus {
  @PrimaryGeneratedColumn('uuid', {
    name: 'uuid_campus',
  })
  uuid: string;

  @Column({type: 'varchar', length: 50})
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;
}

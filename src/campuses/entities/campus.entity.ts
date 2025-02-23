import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'src/roles/entities/role.entity';
import { Guild } from 'src/guilds/entities/guild.entity';

@Entity('Campuses')
export class Campus {
  @ApiProperty({
    description: 'UUID unique du campus',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'uuid_campus' })
  uuid_campus: string;

  @ApiProperty({
    description: 'Le nom du campus',
    example: 'Campus de Lille',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-17T12:00:00Z'
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-02-17T12:00:00Z'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', name: 'uuid_role' })
  uuid_role: string;

  @OneToOne(() => Role, role => role.campus)
  @JoinColumn({ name: 'uuid_role' })
  role: Role

  @Column({ type: 'varchar', name: 'uuid_guild' })
  uuid_guild: string

  @ManyToOne(() => Guild, guild => guild.campuses)
  @JoinColumn({ name: 'uuid_guild' })
  guild: Guild

}

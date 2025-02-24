import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Guild } from '../../guilds/entities/guild.entity';

@Entity('Campuses')
export class Campus {
  @ApiProperty({
    description: 'UUID unique du campus',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'uuid_campus' })
  uuid: string;

  @ApiProperty({
    description: 'Nom du campus',
    example: 'Simplon Paris',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'UUID Discord du serveur associé',
    example: '123456789012345678'
  })
  @Column({ name: 'uuidGuild', type: 'varchar', length: 19 })
  uuidGuild: string;

  @ApiProperty({
    description: 'Date de création'
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Le serveur Discord associé au campus',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.campuses)
  @JoinColumn({ name: 'uuidGuild' })
  guild: Guild;
}

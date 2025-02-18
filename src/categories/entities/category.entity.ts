import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('Categories')
export class Category {
  @ApiProperty({
    description: 'UUID unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Le nom de la catégorie',
    example: 'Général',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'La position de la catégorie',
    example: 1
  })
  @Column({ type: 'int' })
  position: number;

  @ApiProperty({
    description: 'UUID du serveur Discord associé',
    example: '123456789012345678'
  })
  @Column({ name: 'guild_id' })
  guildId: string;

  @ApiProperty({
    description: 'Liste des channels dans cette catégorie',
    type: () => Channel,
    isArray: true
  })
  @OneToMany(() => Channel, channel => channel.category, {
    cascade: true,
    eager: false
  })
  channels: Channel[];

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
}

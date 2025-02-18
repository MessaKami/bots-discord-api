import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Resources')
export class Resource {
  @ApiProperty({
    description: 'UUID unique de la ressource',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid_resource: string;

  @ApiProperty({
    description: 'Le titre de la ressource',
    maxLength: 50,
    example: 'Guide de démarrage'
  })
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @ApiProperty({
    description: 'La description de la ressource',
    example: 'Un guide complet pour démarrer avec le bot'
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: 'Le contenu de la ressource',
    example: 'Voici les étapes pour configurer le bot...'
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Le statut de la ressource',
    enum: ['active', 'inactive'],
    example: 'active'
  })
  @Column({ type: 'enum', enum: ['active', 'inactive'] })
  status: string;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-02-17T12:00:00Z'
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-17T12:00:00Z'
  })
  @CreateDateColumn()
  created_at: Date;
} 
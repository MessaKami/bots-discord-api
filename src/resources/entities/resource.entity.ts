import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../members/entities/member.entity';
import { Report } from '../../reports/entities/report.entity';

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
    description: 'Le membre qui a créé cette ressource',
    type: () => Member
  })
  @ManyToOne(() => Member, member => member.resources, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'creator_uuid' })
  creator: Member;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-02-17T12:00:00Z'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-17T12:00:00Z'
  })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({
    description: 'Les signalements liés à cette ressource',
    type: () => [Report]
  })
  @OneToMany(() => Report, report => report.resource, { 
    cascade: true,
    onDelete: 'CASCADE'
  })
  reports: Report[];
} 
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('GuildTemplates')
export class GuildTemplate {
  @ApiProperty({
    description: 'UUID unique du template',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Le nom du template',
    example: 'Template Serveur Formation',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'Description du template',
    example: 'Template pour les serveurs de formation',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Configuration du template',
    example: {
      channels: ['général', 'annonces'],
      roles: ['admin', 'formateur', 'apprenant'],
      permissions: { default: ['READ_MESSAGES'] }
    }
  })
  @Column({ type: 'jsonb' })
  configuration: Record<string, any>;

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

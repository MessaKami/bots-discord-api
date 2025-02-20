import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('GuildTemplates')
export class GuildTemplate {
  @ApiProperty({
    description: 'ID Discord du template',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19 })
  uuid: string;

  @ApiProperty({
    description: 'Nom du template',
    example: 'Template Serveur Formation'
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
    },
    required: false
  })
  @Column({ 
    type: 'jsonb', 
    nullable: true,
    default: {
      channels: [],
      roles: [],
      permissions: {}
    }
  })
  configuration: Record<string, any>;

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
}

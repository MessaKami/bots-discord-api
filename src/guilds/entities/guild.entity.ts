import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Guilds')
export class Guild {
  @ApiProperty({
    description: 'UUID unique du serveur Discord',
    example: '123456789012345678'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Le nom du serveur',
    example: 'Serveur Simplon',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'Nombre de membres sur le serveur',
    example: 150
  })
  @Column({ name: 'member_count' })
  memberCount: number;

  @ApiProperty({
    description: 'Configuration du serveur',
    example: {
      welcomeChannel: '123456789',
      prefix: '!',
      language: 'fr'
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

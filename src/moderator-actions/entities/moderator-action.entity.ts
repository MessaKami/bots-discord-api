import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ActionType } from '../dto/create-moderator-action.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity('moderator_actions')
export class ModeratorAction {
  @ApiProperty({
    description: 'Identifiant unique de l\'action de modération',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Identifiant de l\'utilisateur ciblé par l\'action',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'Type d\'action de modération',
    enum: ActionType,
    example: ActionType.BAN
  })
  @Column({
    type: 'enum',
    enum: ActionType,
  })
  actionType: ActionType;

  @ApiProperty({
    description: 'Raison de l\'action de modération',
    example: 'Violation des règles de la communauté'
  })
  @Column()
  reason: string;

  @ApiProperty({
    description: 'Durée de la sanction (format: 1d, 2h, 30m, etc.)',
    example: '24h',
    nullable: true
  })
  @Column({ nullable: true })
  duration: string;

  @ApiProperty({
    description: 'Notes additionnelles sur l\'action',
    example: 'Récidive après deux avertissements',
    nullable: true
  })
  @Column({ nullable: true })
  notes: string;

  @ApiProperty({
    description: 'Date de création de l\'action',
    example: '2024-01-01T00:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière modification de l\'action',
    example: '2024-01-01T00:00:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}

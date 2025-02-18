import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ReportCategory {
  SPAM = 'spam',
  HARASSMENT = 'harassment',
  INAPPROPRIATE = 'inappropriate',
  OTHER = 'other'
}

@Entity('Reports')
export class Report {
  @ApiProperty({
    description: 'UUID unique du signalement',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid_report: string;

  @ApiProperty({
    description: 'Catégorie du signalement',
    enum: ReportCategory,
    example: ReportCategory.SPAM
  })
  @Column({
    type: 'enum',
    enum: ReportCategory,
  })
  category: ReportCategory;

  @ApiProperty({
    description: 'Raison du signalement',
    maxLength: 50,
    example: 'Contenu inapproprié'
  })
  @Column({ type: 'varchar', length: 50 })
  reason: string;

  @ApiProperty({
    description: 'Statut du signalement',
    maxLength: 50,
    example: 'pending'
  })
  @Column({ type: 'varchar', length: 50 })
  status: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-17T12:00:00Z'
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-02-17T12:00:00Z'
  })
  @UpdateDateColumn()
  updated_at: Date;
} 
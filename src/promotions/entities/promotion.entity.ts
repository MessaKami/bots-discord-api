import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Promotions')
export class Promotion {
  @ApiProperty({
    description: 'UUID unique de la promotion',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Nom de la promotion',
    example: 'Développeur Web 2024',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'Date de début de la promotion',
    example: '2024-01-01T00:00:00Z'
  })
  @Column({ name: 'start_date' })
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la promotion',
    example: '2024-12-31T23:59:59Z'
  })
  @Column({ name: 'end_date' })
  endDate: Date;

  @ApiProperty({
    description: 'Statut de la promotion',
    example: 'active',
    enum: ['active', 'completed', 'cancelled']
  })
  @Column({ type: 'varchar', length: 20 })
  status: string;

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

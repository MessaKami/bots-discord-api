import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('xp_transactions')
export class XpTransaction {
  @ApiProperty({
    description: 'UUID unique de la transaction XP',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Type de la transaction (GAIN ou LOSS)',
    example: 'GAIN',
    enum: ['GAIN', 'LOSS']
  })
  @Column({ type: 'varchar', length: 50 })
  transaction_type: string;

  @ApiProperty({
    description: 'Valeur de la transaction XP',
    example: 100,
    minimum: 0
  })
  @Column({ type: 'integer' })
  transaction_value: number;

  @ApiProperty({
    description: 'Raison de la transaction',
    example: 'Participation active dans le salon d\'entraide'
  })
  @Column({ type: 'varchar', length: 200 })
  reason: string;

  @ApiProperty({
    description: 'Notes additionnelles (optionnel)',
    example: 'Aide exceptionnelle sur un projet complexe',
    required: false
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-03-14T12:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'UUID du membre',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column('uuid')
  uuidMember: string;
}

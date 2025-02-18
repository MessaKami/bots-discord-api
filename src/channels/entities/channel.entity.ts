import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';

@Entity('Channels')
export class Channel {
  @ApiProperty({
    description: 'UUID unique du channel',
    example: '123456789012345678'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'Le nom du channel',
    example: 'général',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'Le type de channel',
    example: 'text',
    enum: ['text', 'voice', 'announcement']
  })
  @Column()
  type: string;

  @ApiProperty({
    description: 'La position du channel',
    example: 1
  })
  @Column({ name: 'channel_position' })
  channelPosition: number;

  @ApiProperty({
    description: 'La catégorie du channel',
    type: () => Category
  })
  @ManyToOne(() => Category, category => category.channels, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({
    description: 'UUID de la catégorie associée',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

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
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entities/course.entity';
import { Guild } from '../../guilds/entities/guild.entity';
@Entity('Promotions')
export class Promotion {
  @ApiProperty({
    description: 'UUID unique de la promotion',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'uuid_promotion' })
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
  @Column({ name: 'start_date', type: 'timestamp with time zone' })
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la promotion',
    example: '2024-12-31T23:59:59Z'
  })
  @Column({ name: 'end_date', type: 'timestamp with time zone' })
  endDate: Date;

  @ApiProperty({
    description: 'Statut de la promotion',
    example: 'active',
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  })
  @Column({ 
    type: 'varchar', 
    length: 20, 
    default: 'active'
  })
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

  @Column({ name: 'uuidCourse', type: 'uuid' })
  uuidCourse: string;

  @Column({ type: 'uuid', name: 'uuidGuild' })
  uuidGuild: string;

  @ManyToOne(() => Course, course => course.promotions)
  @JoinColumn({ name: 'uuidCourse' })
  course: Course;

  @ManyToOne(() => Guild, guild => guild.promotions)
  @JoinColumn({ name: 'uuidGuild' })
  guild: Guild;
}

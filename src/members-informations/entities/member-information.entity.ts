import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('MembersInformations')
export class MemberInformation {
  @ApiProperty({
    description: 'UUID unique des informations du membre',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    description: 'UUID du membre associé',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column({ name: 'member_id' })
  memberId: string;

  @ApiProperty({
    description: 'Prénom du membre',
    example: 'John',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @ApiProperty({
    description: 'Nom du membre',
    example: 'Doe',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @ApiProperty({
    description: 'Email du membre',
    example: 'john.doe@example.com',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  email: string;

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
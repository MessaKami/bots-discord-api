import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('Categories')
export class Category {
  @ApiProperty({
    description: 'ID Discord de la catégorie',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19 })
  uuid: string;

  @ApiProperty({
    description: 'Le nom de la catégorie',
    example: 'Général',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'La position de la catégorie',
    example: 1
  })
  @Column({ type: 'int' })
  position: number;

  @ApiProperty({
    description: 'ID Discord du serveur associé',
    example: '123456789012345678'
  })
  @Column({ name: 'guild_id', type: 'varchar', length: 19 })
  guildId: string;

  @ApiProperty({
    description: 'Liste des channels dans cette catégorie',
    type: () => Channel,
    isArray: true
  })
  @OneToMany(() => Channel, channel => channel.category)
  channels: Channel[];

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

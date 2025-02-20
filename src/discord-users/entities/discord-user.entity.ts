import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Discord_users')
export class DiscordUser {
  @ApiProperty({
    description: 'ID Discord de l\'utilisateur',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'uuid_discord' })
  uuidDiscord: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur Discord',
    example: 'JohnDoe#1234'
  })
  @Column({ type: 'varchar', length: 50, name: 'discord_username' })
  discordUsername: string;

  @ApiProperty({
    description: 'Discriminateur Discord',
    example: '1234'
  })
  @Column({ type: 'varchar', length: 50 })
  discriminator: string;

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
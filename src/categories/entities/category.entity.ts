import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../../channels/entities/channel.entity';
import { Guild } from 'src/guilds/entities/guild.entity';
import { Course } from 'src/courses/entities/course.entity';
@Entity('categories')
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
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour'
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @OneToOne(() => Guild)
  @JoinColumn({ name: 'uuid_guild' })
  guild: Guild;

  @ApiProperty({
    description: 'Formation associée à la catégorie',
    type: () => [Course],
    isArray: true
  })
  @OneToOne(() => Course, course => course.category)
  @JoinColumn({ name: 'uuid_course' })
  course: Course;
}

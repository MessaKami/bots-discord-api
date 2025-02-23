import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entities/course.entity';
import { Member } from '../../members/entities/member.entity';
import { Campus } from 'src/campuses/entities/campus.entity';

@Entity('Guilds')
export class Guild {
  @ApiProperty({
    description: 'ID Discord du serveur',
    example: '123456789012345678',
  })
  @PrimaryColumn({ type: 'varchar', length: 19 })
  uuid: string;

  @ApiProperty({
    description: 'Nom du serveur',
    example: 'Simplon Server',
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Nombre de membres',
    example: 100,
  })
  @Column({ type: 'int' })
  memberCount: number;

  @ApiProperty({
    description: 'Configuration du serveur',
    example: { welcomeChannel: '123456789012345678', prefix: '!' },
  })
  @Column({ type: 'jsonb', nullable: true })
  configuration: Record<string, any>;

  @ApiProperty({
    description: 'Date de création',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Member, (member) => member.guild)
  members: Member[];

  @OneToMany(() => Campus, (campus) => campus.guild)
  campuses: Campus[];

  //@OneToOne(() => Course, course => course.guild)
  //@JoinColumn({ name: 'uuid_course' })
  //course: Course;
}

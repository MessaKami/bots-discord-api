import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from '../../roles/entities/role.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('courses')
export class Course {
    @ApiProperty({
      description: 'UUID unique de la formation',
      example: '635e4527-a79x-15c8-g416-426514174780'
    })
    @PrimaryGeneratedColumn('uuid')
    uuidCourse: string;

    @ApiProperty({
      description: 'Nom de la formation',
      example: 'Développeur Web',
      maxLength: 50
    })
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ApiProperty({
      description: 'Indique si la formation est certifiée',
      example: true
    })
    @Column({ type: 'boolean' })
    isCertified: boolean;

    @ApiProperty({
      description: 'Date de création',
      example: '2024-02-17T12:00:00Z'
    })
    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
    createdAt: Date;

    @ApiProperty({
      description: 'Date de dernière mise à jour',
      example: '2024-02-17T12:00:00Z'
    })
    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
      })
    updatedAt: Date;

    @ApiProperty({
      description: 'Catégorie associée à la formation',
      example: '563p6455-e89b-56i8-h284-4266141740052'
    })
    @OneToOne(() => Category, category => category.course)
    @JoinColumn({ name: 'uuiCategory' })
    category: Category;

    @ApiProperty({
      description: 'UUID unique de la catégorie',
      example: '563p6455-e89b-56i8-h284-4266141740052'
    })
    @Column({ name: 'uuid_category', type: 'varchar', length: 19 })
    uuidCategory: string;

    @ApiProperty({
      description: 'Guilde associée aux formations',
      example: '264l6455-j43g-28k4-s567-6543298236052'
    })
    @ManyToOne(() => Guild, guild => guild.course)
    @JoinColumn({ name: 'uuidGuild' })
    guild: Guild;

    @ApiProperty({
      description: 'UUID unique de la guilde',
      example: '264l6455-j43g-28k4-s567-6543298236052'
    })
    @Column({ name: 'uuid_guild', type: 'varchar', length: 19})
    uuidGuild: string;

    @ApiProperty({
      description: 'Rôles associés aux formations',
      type: () => [Role],
      isArray: true
    })
    @ManyToMany(() => Role, role => role.course)
    @JoinTable({
      name: 'courses_roles',
      joinColumn: {
          name: 'uuid_course',
          referencedColumnName: 'uuidCourse'
      },
      inverseJoinColumn: {
          name: 'uuid_role',
          referencedColumnName: 'uuidRole'
      }})
    roles: Role[];

    @ApiProperty({
      description: 'Promotions associées à la formation',
      type: () => [Promotion],
      isArray: true
    })
    @OneToMany(() => Promotion, promotion => promotion.course)
    promotions: Promotion[];

    @ApiProperty({
      description: 'Chaînes associées à la formation',
      type: () => [Channel],
      isArray: true
    })
    @OneToMany(() => Channel, channel => channel.course)
    channels: Channel[];
}
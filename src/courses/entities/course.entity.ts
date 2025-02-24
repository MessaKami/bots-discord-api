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
      example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ApiProperty({
      description: 'Nom de la formation',
      example: 'Développeur web',
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
      description: 'Guilde associée aux formations',
      type: () => Guild
    })
    @ManyToOne(() => Guild, guild => guild.course)
    @JoinColumn({ name: 'uuid_guild' })
    guild: Guild;

    @ApiProperty({
      description: 'UUID unique de la guilde',
      example: '123456789012345678'
    })
    @Column({ name: 'uuid_guild', type: 'varchar', length: 19})
    uuidGuild: string;

    @ApiProperty({
      description: 'Catégorie associée à la formation',
      example: {
        uuid: '123456789012345678',
        name: 'Développement Web'
      }
    })
    @OneToOne(() => Category, category => category.course)
    @JoinColumn({ name: 'uuid_category' })
    category: Category;

    @ApiProperty({
      description: 'UUID unique de la catégorie',
      example: '123456789012345678',
      nullable: true
    })
    @Column({ 
      name: 'uuid_category', 
      type: 'varchar', 
      length: 19,
      nullable: true 
    })
    uuidCategory: string;

    @ApiProperty({
      description: 'Rôles associés aux formations',
      type: () => [Role],
      isArray: true,
      nullable: true
    })
    @ManyToMany(() => Role, role => role.course)
    @JoinTable({
      name: 'courses_roles',
      joinColumns: [{
          name: 'uuid_course',
          referencedColumnName: 'uuid'
      }],
      inverseJoinColumns: [{
          name: 'uuid_role',
          referencedColumnName: 'uuid'
      }]
    })
    roles: Role[];

    @ApiProperty({
      description: 'Promotions associées à la formation',
      type: () => [Promotion],
      isArray: true,
      nullable: true,
    })
    @OneToMany(() => Promotion, promotion => promotion.course)
    promotions: Promotion[];

    @ApiProperty({
      description: 'Chaînes associées à la formation',
      type: () => [Channel],
      isArray: true,
      nullable: true,
    })
    @OneToMany(() => Channel, channel => channel.course)
    channels: Channel[];
}
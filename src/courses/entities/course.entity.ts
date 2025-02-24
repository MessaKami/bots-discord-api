import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from '../../roles/entities/role.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid', { name: 'uuid_course' })
    uuid_course: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'boolean' })
    isCertified: boolean;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
      })
    updatedAt: Date;

    @OneToOne(() => Category, category => category.course)
    @JoinColumn({ name: 'uuiCategory' })
    category: Category;

    @Column({ name: 'uuid_category', type: 'varchar', length: 19, nullable: true })
    uuidCategory: string;

    @Column({ name: 'uuid_guild', type: 'varchar', length: 19, nullable: true})
    uuid_uuild: string;

    @ManyToOne(() => Guild, guild => guild.courses)
    @JoinColumn({ name: 'uuid_guild' })
    guild: Guild;

    @Column({ name: 'uuid_role', type: 'varchar', length: 19, nullable: true })
    uuid_role: string;

    @OneToMany(() => Role, role => role.course)
    roles: Role[];

    @OneToMany(() => Promotion, promotion => promotion.course)
    promotions: Promotion[];

    @OneToMany(() => Channel, channel => channel.course)
    channels: Channel[];
}
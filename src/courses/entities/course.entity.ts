import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from '../../roles/entities/role.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid', { name: 'uuid_course' })
    uuid: string;

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

    @Column({ name: 'uuidCategory', type: 'varchar', length: 19, nullable: true })
    uuidCategory: string;

    @OneToOne(() => Guild, guild => guild.course)
    @JoinColumn({ name: 'uuidGuild' })
    guild: Guild;

    @Column({ name: 'uuidGuild', type: 'varchar', length: 19, nullable: true})
    uuidGuild: string;

    @OneToMany(() => Role, role => role.course)
    roles: Role[];

    @OneToMany(() => Promotion, promotion => promotion.course)
    promotions: Promotion[];

    @OneToMany(() => Channel, channel => channel.course)
    channels: Channel[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from '../../roles/entities/role.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    uuidCourse: string;

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

    @Column({ name: 'uuid_category', type: 'varchar', length: 19 })
    uuidCategory: string;

    @OneToOne(() => Guild, guild => guild.course)
    @JoinColumn({ name: 'uuidGuild' })
    guild: Guild;

    @Column({ name: 'uuid_guild', type: 'varchar', length: 19})
    uuidGuild: string;

    @OneToMany(() => Role, role => role.course)
    @JoinColumn({ name: 'uuidRole' })
    roles: Role[];

    @OneToMany(() => Promotion, promotion => promotion.course)
    @JoinColumn({ name: 'uuidPromotion' })
    promotions: Promotion[];

    @OneToMany(() => Channel, channel => channel.course)
    @JoinColumn({ name: 'uuidChannel' })
    channels: Channel[];
}
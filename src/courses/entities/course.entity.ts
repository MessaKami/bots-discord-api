import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from '../../roles/entities/role.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('coursess')
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

    @OneToOne(() => Category, Category => Category.course)
    @JoinColumn({ name: 'uuiCategory' })
    category: Category;

    @Column({ name: 'uuid_category', type: 'varchar', length: 19 })
    uuidCategory: string;

    @OneToOne(() => Guild, Guild => Guild.course)
    @JoinColumn({ name: 'uuidGuild' })
    guild: Guild;

    @Column({ name: 'uuid_guild', type: 'varchar', length: 19})
    uuidGuild: string;

    @OneToMany(() => Role, Role => Role.course)
    @JoinColumn({ name: 'uuidRole' })
    roles: Role;

    @Column({ name: 'uuid_role', type: 'varchar', length: 19 })
    uuidRole: string;

    @OneToMany(() => Promotion, Promotion => Promotion.course)
    @JoinColumn({ name: 'uuidPromotion' })
    promotions: Promotion;

    @Column({ name: 'uuid_promotion', type:'uuid' })
    uuidPromotion: string;

    @OneToMany(() => Channel, Channel => Channel.course)
    @JoinColumn({ name: 'uuidChannel' })
    channels: Channel;

    @Column({ name: 'uuid_channel', type: 'varchar', length: 19 })
    uuidChannel: string;
}
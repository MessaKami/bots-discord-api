import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { DiscordUser } from '../../discord-users/entities/discord-user.entity';

@Entity('dashboard_accounts')
export class DashboardAccount {
    @PrimaryGeneratedColumn('uuid', { name: 'uuid_dashboard_account' })
    uuid_dashboard_account: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

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

    @OneToOne(() => DiscordUser, discordUser => discordUser.dashboardAccount)
    @JoinColumn({ name: 'uuid_discord' })
    discordUser: DiscordUser;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { DiscordUser } from '../../discord-users/entities/discord-user.entity';
// import { bigint } from '../../types';
import { Timestamp } from 'typeorm';

@Entity('dashboard_accounts')
export class DashboardAccount {
    @PrimaryGeneratedColumn('uuid')
    uuidDashboardAccount: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Timestamp;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Timestamp;

    // @ManyToOne(() => DiscordUser, discordUser => discordUser.dashboardAccounts) 
    // @JoinColumn({ name: 'uuidDiscord' })
    // uuidDiscord: bigint;
}
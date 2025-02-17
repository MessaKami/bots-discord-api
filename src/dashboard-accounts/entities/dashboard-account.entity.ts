import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { DiscordUser } from '../../discord-users/entities/discord-user.entity';
// import { bigint } from '../../types';

@Entity('dashboard_accounts')
export class DashboardAccount {
    @PrimaryGeneratedColumn('uuid')
    uuidDashboardAccount: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @ManyToOne(() => DiscordUser, discordUser => discordUser.dashboardAccounts) 
    // @JoinColumn({ name: 'uuidDiscord' })
    // uuidDiscord: bigint;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { DiscordUser } from '../../discord-users/entities/discord-user.entity';

@Entity('dashboard_accounts')
export class DashboardAccount {
    @PrimaryGeneratedColumn('uuid')
    uuidDashboardAccount: string;

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

    // @ManyToOne(() => DiscordUser, discordUser => discordUser.dashboardAccounts) 
    // @JoinColumn({ name: 'uuidDiscord' })
    // uuidDiscord: bigint;
}
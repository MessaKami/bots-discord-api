import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardAccountController } from './dashboard-accounts.controller';
import { DashboardAccountService } from './dashboard-accounts.service';
import { DashboardAccount } from './entities/dashboard-account.entity';
import { DashboardAccountsRepository } from './dashboard-accounts.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([DashboardAccount, DashboardAccountsRepository]), 
    ],
    controllers: [DashboardAccountController],
    providers: [DashboardAccountService],
    exports: [DashboardAccountService], 
})
export class DashboardAccountModule {}
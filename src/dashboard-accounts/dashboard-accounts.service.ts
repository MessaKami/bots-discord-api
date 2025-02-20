// src/dashboard-accounts/dashboard-account.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardAccount } from './entities/dashboard-account.entity';
import { CreateDashboardAccountDto } from './dto/create-dashboard-account.dto';
import { UpdateDashboardAccountDto } from './dto/update-dashboard-account.dto';

@Injectable()
export class DashboardAccountService {
    constructor(
        @InjectRepository(DashboardAccount)
        private readonly dashboardAccountRepository: Repository<DashboardAccount>,
    ) {}

    async create(createDashboardAccountDto: CreateDashboardAccountDto): Promise<DashboardAccount> {
        const dashboardAccount = this.dashboardAccountRepository.create(createDashboardAccountDto);
        return await this.dashboardAccountRepository.save(dashboardAccount);
    }

    async getByUUID(uuid_dashboard_account: string): Promise<DashboardAccount> {
        const dashboardAccount = await this.dashboardAccountRepository.findOne({ where: { uuid_dashboard_account } });
        if (!dashboardAccount) {
            throw new NotFoundException(`Dashboard account with UUID ${uuid_dashboard_account} not found`);
        }
        return dashboardAccount;
    }

    async updateByUUID(uuid_dashboard_account: string, updateDashboardAccountDto: UpdateDashboardAccountDto): Promise<DashboardAccount> {
        const dashboardAccount = await this.getByUUID(uuid_dashboard_account); // Vérifie si l'entité existe
        Object.assign(dashboardAccount, updateDashboardAccountDto); // Met à jour les propriétés
        return await this.dashboardAccountRepository.save(dashboardAccount);
    }

    async deleteByUUID(uuid_dashboard_account: string): Promise<void> {
        const dashboardAccount = await this.dashboardAccountRepository.findOne({ 
            where: { uuid_dashboard_account } 
        });
        
        if (!dashboardAccount) {
            throw new NotFoundException(`Dashboard account with UUID ${uuid_dashboard_account} not found`);
        }
        
        await this.dashboardAccountRepository.delete({ uuid_dashboard_account });
    }
}
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

    async getByUUID(uuidDashboardAccount: string): Promise<DashboardAccount> {
        const dashboardAccount = await this.dashboardAccountRepository.findOne({ where: { uuidDashboardAccount } });
        if (!dashboardAccount) {
            throw new NotFoundException(`Dashboard account with UUID ${uuidDashboardAccount} not found`);
        }
        return dashboardAccount;
    }

    async updateByUUID(uuidDashboardAccount: string, updateDashboardAccountDto: UpdateDashboardAccountDto): Promise<DashboardAccount> {
        const dashboardAccount = await this.getByUUID(uuidDashboardAccount); // Vérifie si l'entité existe
        Object.assign(dashboardAccount, updateDashboardAccountDto); // Met à jour les propriétés
        return await this.dashboardAccountRepository.save(dashboardAccount);
    }

    async deleteByUUID(uuidDashboardAccount: string): Promise<void> {
        const dashboardAccount = await this.dashboardAccountRepository.findOne({ 
            where: { uuidDashboardAccount } 
        });
        
        if (!dashboardAccount) {
            throw new NotFoundException(`Dashboard account with UUID ${uuidDashboardAccount} not found`);
        }
        
        await this.dashboardAccountRepository.delete({ uuidDashboardAccount });
    }
}
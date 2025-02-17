import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { DashboardAccountService } from './dashboard-accounts.service';
import { CreateDashboardAccountDto } from './dto/create-dashboard-account.dto';
import { UpdateDashboardAccountDto } from './dto/update-dashboard-account.dto';
import { DashboardAccount } from './entities/dashboard-account.entity';

@Controller('dashboardAccounts')
export class DashboardAccountController {
    constructor(private readonly dashboardAccountService: DashboardAccountService) {}

    @Post()
    async create(@Body() createDashboardAccountDto: CreateDashboardAccountDto): Promise<DashboardAccount> {
        return this.dashboardAccountService.create(createDashboardAccountDto);
    }

    @Get(':uuidDashboardAccount')
    async getByUUID(@Param('uuidDashboardAccount') uuidDashboardAccount: string): Promise<DashboardAccount> {
        return this.dashboardAccountService.getByUUID(uuidDashboardAccount);
    }

    @Put(':uuidDashboardAccount')
    async updateByUUID(
        @Param('uuidDashboardAccount') uuidDashboardAccount: string,
        @Body() updateDashboardAccountDto: UpdateDashboardAccountDto,
    ): Promise<DashboardAccount> {
        return this.dashboardAccountService.updateByUUID(uuidDashboardAccount, updateDashboardAccountDto);
    }

    @Delete(':uuidDashboardAccount')
    async deleteByUUID(@Param('uuidDashboardAccount') uuidDashboardAccount: string): Promise<void> {
        return this.dashboardAccountService.deleteByUUID(uuidDashboardAccount);
    }
}
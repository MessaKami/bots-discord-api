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

    @Get(':uuid_dashboard_account')
    async getByUUID(@Param('uuid_dashboard_account') uuid_dashboard_account: string): Promise<DashboardAccount> {
        return this.dashboardAccountService.getByUUID(uuid_dashboard_account);
    }

    @Put(':uuid_dashboard_account')
    async updateByUUID(
        @Param('uuid_dashboard_account') uuid_dashboard_account: string,
        @Body() updateDashboardAccountDto: UpdateDashboardAccountDto,
    ): Promise<DashboardAccount> {
        return this.dashboardAccountService.updateByUUID(uuid_dashboard_account, updateDashboardAccountDto);
    }

    @Delete(':uuid_dashboard_account')
    async deleteByUUID(@Param('uuid_dashboard_account') uuid_dashboard_account: string): Promise<void> {
        return this.dashboardAccountService.deleteByUUID(uuid_dashboard_account);
    }
}
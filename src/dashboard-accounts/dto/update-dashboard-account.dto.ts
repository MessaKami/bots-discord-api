import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardAccountDto } from './create-dashboard-account.dto';

export class UpdateDashboardAccountDto extends PartialType(CreateDashboardAccountDto) {}
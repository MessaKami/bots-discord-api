import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create(createReportDto);
    return await this.reportsRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return await this.reportsRepository.find();
  }

  async findOne(uuid: string): Promise<Report> {
    try {
      const report = await this.reportsRepository.findOne({ where: { uuid_report: uuid } });
      if (!report) {
        throw new NotFoundException(`Signalement avec l'UUID ${uuid} non trouvé`);
      }
      return report;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Signalement avec l'UUID ${uuid} non trouvé`);
    }
  }

  async update(uuid: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(uuid);
    Object.assign(report, updateReportDto);
    return await this.reportsRepository.save(report);
  }

  async remove(uuid: string): Promise<void> {
    try {
      const result = await this.reportsRepository.delete({ uuid_report: uuid });
      if (result.affected === 0) {
        throw new NotFoundException(`Signalement avec l'UUID ${uuid} non trouvé`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Signalement avec l'UUID ${uuid} non trouvé`);
    }
  }
} 
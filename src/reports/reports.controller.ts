import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau signalement' })
  @ApiResponse({ status: 201, description: 'Le signalement a été créé avec succès.', type: Report })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les signalements' })
  @ApiResponse({ status: 200, description: 'Liste des signalements récupérée avec succès.', type: [Report] })
  findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Récupérer un signalement par son UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID du signalement', type: 'string' })
  @ApiResponse({ status: 200, description: 'Le signalement a été trouvé.', type: Report })
  @ApiResponse({ status: 404, description: 'Signalement non trouvé' })
  findOne(@Param('uuid') uuid: string): Promise<Report> {
    return this.reportsService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Mettre à jour un signalement' })
  @ApiParam({ name: 'uuid', description: 'UUID du signalement', type: 'string' })
  @ApiResponse({ status: 200, description: 'Le signalement a été mis à jour.', type: Report })
  @ApiResponse({ status: 404, description: 'Signalement non trouvé' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  update(
    @Param('uuid') uuid: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<Report> {
    return this.reportsService.update(uuid, updateReportDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Supprimer un signalement' })
  @ApiParam({ name: 'uuid', description: 'UUID du signalement', type: 'string' })
  @ApiResponse({ status: 200, description: 'Le signalement a été supprimé.' })
  @ApiResponse({ status: 404, description: 'Signalement non trouvé' })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.reportsService.remove(uuid);
  }
} 
import { Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report, ReportType } from './entities/report.entity';
import { Member } from '../members/entities/member.entity';
import { Resource } from '../resources/entities/resource.entity';
import { plainToInstance } from 'class-transformer';
import { ReportResponseDto } from './dto/responses/report.response.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<ReportResponseDto> {
    // Validation conditionnelle selon le type de signalement
    if (createReportDto.type === ReportType.RESOURCE && !createReportDto.uuid_resource) {
      throw new BadRequestException('UUID de la ressource requis pour un signalement de ressource');
    }
    if (createReportDto.type === ReportType.MEMBER && !createReportDto.uuid_reported_member) {
      throw new BadRequestException('UUID du membre requis pour un signalement de membre');
    }
    if (createReportDto.type === ReportType.RESOURCE && createReportDto.uuid_reported_member) {
      throw new BadRequestException('UUID du membre non autorisé pour un signalement de ressource');
    }
    if (createReportDto.type === ReportType.MEMBER && createReportDto.uuid_resource) {
      throw new BadRequestException('UUID de la ressource non autorisé pour un signalement de membre');
    }

    // Vérifier que le reporter existe
    const reporter = await this.membersRepository.findOne({
      where: { uuid_member: createReportDto.uuid_reporter }
    });
    if (!reporter) {
      throw new NotFoundException(`Reporter with UUID ${createReportDto.uuid_reporter} not found`);
    }

    // Vérifier l'élément reporté selon le type
    let resource: Resource | null = null;
    let reportedMember: Member | null = null;

    if (createReportDto.type === ReportType.RESOURCE) {
      resource = await this.resourcesRepository.findOne({
        where: { uuid_resource: createReportDto.uuid_resource }
      });
      if (!resource) {
        throw new NotFoundException(`Resource with UUID ${createReportDto.uuid_resource} not found`);
      }
    } else if (createReportDto.type === ReportType.MEMBER) {
      reportedMember = await this.membersRepository.findOne({
        where: { uuid_member: createReportDto.uuid_reported_member }
      });
      if (!reportedMember) {
        throw new NotFoundException(`Member with UUID ${createReportDto.uuid_reported_member} not found`);
      }
    }

    // Vérifier si un signalement similaire existe déjà
    const existingReport = await this.reportsRepository.findOne({
      where: {
        reporter: { uuid_member: reporter.uuid_member },
        ...(resource && { resource: { uuid_resource: resource.uuid_resource } }),
        ...(reportedMember && { reported_member: { uuid_member: reportedMember.uuid_member } })
      },
      relations: ['reporter', 'resource', 'reported_member']
    });

    if (existingReport) {
      throw new ConflictException(
        `Un signalement existe déjà pour cet élément par ce membre (UUID: ${existingReport.uuid_report})`
      );
    }

    // Créer le report
    const newReport = new Report();
    newReport.type = createReportDto.type;
    newReport.category = createReportDto.category;
    newReport.reason = createReportDto.reason;
    newReport.status = 'pending';
    newReport.reporter = reporter;
    newReport.resource = resource || undefined;
    newReport.reported_member = reportedMember || undefined;

    const savedReport = await this.reportsRepository.save(newReport);
    
    // Récupérer le rapport avec toutes ses relations
    const reportWithRelations = await this.reportsRepository.findOne({
      where: { uuid_report: savedReport.uuid_report },
      relations: ['reporter', 'resource', 'reported_member']
    });

    return plainToInstance(ReportResponseDto, reportWithRelations, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ReportResponseDto[]> {
    const reports = await this.reportsRepository.find({
      relations: ['reporter', 'resource', 'reported_member']
    });
    
    return reports.map(report => 
      plainToInstance(ReportResponseDto, report, { excludeExtraneousValues: true })
    );
  }

  async findOne(uuid_report: string): Promise<ReportResponseDto> {
    const report = await this.reportsRepository.findOne({
      where: { uuid_report },
      relations: ['reporter', 'resource', 'reported_member']
    });
    
    if (!report) {
      throw new NotFoundException(`Report with UUID ${uuid_report} not found`);
    }
    
    return plainToInstance(ReportResponseDto, report, { excludeExtraneousValues: true });
  }

  async update(uuid: string, updateReportDto: UpdateReportDto): Promise<ReportResponseDto> {
    throw new ForbiddenException(
      'Les utilisateurs ne peuvent pas modifier leurs signalements. Seuls les modérateurs peuvent mettre à jour le statut.'
    );
    // Cette fonctionnalité sera implémentée plus tard avec le système de modération
  }

  async remove(uuid: string, currentUserId: string): Promise<void> {
    const reportDto = await this.findOne(uuid);
    
    // Vérifier si l'utilisateur est le créateur du signalement
    if (reportDto.reporter.uuid_member !== currentUserId) {
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que vos propres signalements'
      );
    }

    // Récupérer l'entité Report avant de la supprimer
    const report = await this.reportsRepository.findOne({
      where: { uuid_report: uuid },
      relations: ['reporter', 'resource', 'reported_member']
    });

    if (!report) {
      throw new NotFoundException(`Report with UUID ${uuid} not found`);
    }

    await this.reportsRepository.remove(report);
  }
} 
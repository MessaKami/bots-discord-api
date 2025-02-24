import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpStatus } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Promotion } from './entities/promotion.entity';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(
    private readonly promotionsService: PromotionsService
    ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Créer une promotion',
    description: 'Crée une promotion avec un rôle associé et l\'enregistre en base de données.'
  })
  @ApiBody({ type: CreatePromotionDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'La promotion a été créée avec succès.',
    type: Promotion 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides fournies dans la requête.' 
  })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }


  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les promotions' })
  @ApiResponse({ status: 200, description: 'Liste des promotions récupérée avec succès.', type: [Promotion] })
  findAll() {
    return this.promotionsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Récupérer une promotion par son UUID' })
  @ApiResponse({ status: 200, description: 'La promotion a été trouvée.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  findOne(@Param('uuid') uuid: string) {
    return this.promotionsService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Mettre à jour une promotion' })
  @ApiResponse({ status: 200, description: 'La promotion a été mise à jour avec succès.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  async update(@Param('uuid') uuid: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionsService.update(uuid, updatePromotionDto);
    if (!promotion) {
      throw new NotFoundException(`Promotion with UUID "${uuid}" not found`);
    }
    return promotion;
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Supprimer une promotion' })
  @ApiResponse({ status: 200, description: 'La promotion a été supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  remove(@Param('uuid') uuid: string) {
    return this.promotionsService.remove(uuid);
  }
} 
import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Promotion } from './entities/promotion.entity';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionService: PromotionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle promotion' })
  @ApiResponse({ status: 201, description: 'La promotion a été créée avec succès.', type: Promotion })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les promotions' })
  @ApiResponse({ status: 200, description: 'Liste des promotions récupérée avec succès.', type: [Promotion] })
  findAll() {
    return this.promotionService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Récupérer une promotion par son UUID' })
  @ApiResponse({ status: 200, description: 'La promotion a été trouvée.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  findOne(@Param('uuid') uuid: string) {
    return this.promotionService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Mettre à jour une promotion' })
  @ApiResponse({ status: 200, description: 'La promotion a été mise à jour avec succès.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  async update(@Param('uuid') uuid: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionService.update(uuid, updatePromotionDto);
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
    return this.promotionService.remove(uuid);
  }
} 
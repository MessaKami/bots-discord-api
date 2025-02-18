import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionService: PromotionsService) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.promotionService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionService.update(uuid, updatePromotionDto);
    if (!promotion) {
      throw new NotFoundException(`Promotion with UUID "${uuid}" not found`);
    }
    return promotion;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.promotionService.remove(uuid);
  }
} 
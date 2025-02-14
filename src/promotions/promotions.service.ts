import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  findAll() {
    return this.promotionRepository.find();
  }

  findOne(uuid: string) {
    return this.promotionRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.findOneBy({ uuid });
    if (!promotion) {
      return null;
    }
    Object.assign(promotion, updatePromotionDto);
    return this.promotionRepository.save(promotion);
  }

  remove(uuid: string) {
    return this.promotionRepository.delete({ uuid });
  }
} 
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(uuid: string) {
    return this.categoriesRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ uuid });
    if (!category) {
      return null;
    }
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  remove(uuid: string) {
    return this.categoriesRepository.delete({ uuid });
  }
}

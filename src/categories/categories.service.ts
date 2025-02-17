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

  findOne(uuidSF: string) {
    return this.categoriesRepository.findOneBy({ uuidSF });
  }

  async update(uuidSF: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ uuidSF });
    if (!category) {
      return null;
    }
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  remove(uuidSF: string) {
    return this.categoriesRepository.delete({ uuidSF });
  }
}

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
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(uuid: string) {
    return this.categoryRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ uuid });
    if (!category) {
      return null;
    }
    
    // Mise à jour des champs autorisés uniquement
    const { name, position } = updateCategoryDto;
    if (name !== undefined) category.name = name;
    if (position !== undefined) category.position = position;
    
    category.updatedAt = new Date();
    return this.categoryRepository.save(category);
  }

  remove(uuid: string) {
    return this.categoryRepository.delete({ uuid });
  }
}

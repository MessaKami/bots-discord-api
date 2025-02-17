import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':uuidSF')
  findOne(@Param('uuidSF') uuidSF: string) {
    return this.categoriesService.findOne(uuidSF);
  }

  @Put(':uuidSF')
  async update(@Param('uuidSF') uuidSF: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.update(uuidSF, updateCategoryDto);
    if (!category) {
      throw new NotFoundException(`Category with UUID "${uuidSF}" not found`);
    }
    return category;
  }

  @Delete(':uuidSF')
  remove(@Param('uuidSF') uuidSF: string) {
    return this.categoriesService.remove(uuidSF);
  }
}

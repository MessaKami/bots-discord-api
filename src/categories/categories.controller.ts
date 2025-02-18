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

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.categoriesService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.update(uuid, updateCategoryDto);
    if (!category) {
      throw new NotFoundException(`Category with UUID "${uuid}" not found`);
    }
    return category;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.categoriesService.remove(uuid);
  }
}

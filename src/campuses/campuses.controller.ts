import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CampusesService } from './campuses.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Controller('campuses')
export class CampusesController {
  constructor(private readonly campusService: CampusesService) {}

  @Post()
  create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusService.create(createCampusDto);
  }

  @Get()
  findAll() {
    return this.campusService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.campusService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateCampusDto: UpdateCampusDto) {
    const campus = await this.campusService.update(uuid, updateCampusDto);
    if (!campus) {
      throw new NotFoundException(`Campus with UUID "${uuid}" not found`);
    }
    return campus;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.campusService.remove(uuid);
  }
}

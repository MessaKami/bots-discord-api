import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { IdentificationRequestsService } from './identification-requests.service';
import { CreateIdentificationRequestDto } from './dto/create-identification-request.dto';
import { UpdateIdentificationRequestDto } from './dto/update-identification-request.dto';

@Controller('identification-requests')
export class IdentificationRequestsController {
  constructor(private readonly identificationRequestsService: IdentificationRequestsService) {}

  @Post()
  create(@Body() createIdentificationRequestDto: CreateIdentificationRequestDto) {
    return this.identificationRequestsService.create(createIdentificationRequestDto);
  }

  @Get()
  findAll() {
    return this.identificationRequestsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.identificationRequestsService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateIdentificationRequestDto: UpdateIdentificationRequestDto) {
    const identificationRequest = await this.identificationRequestsService.update(uuid, updateIdentificationRequestDto);
    if (!identificationRequest) {
      throw new NotFoundException(`IdentificationRequest with UUID "${uuid}" not found`);
    }
    return identificationRequest;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.identificationRequestsService.remove(uuid);
  }
}

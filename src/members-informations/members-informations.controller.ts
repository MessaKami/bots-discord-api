import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { MembersInformationsService } from './members-informations.service';
import { CreateMemberInformationsDto } from './dto/create-member-informations.dto';
import { UpdateMemberInformationsDto } from './dto/update-member-informations.dto';

@Controller('members-informations')
export class MembersInformationsController {
  constructor(private readonly membersInformationsService: MembersInformationsService) {}

  @Post()
  create(@Body() createMemberInformationDto: CreateMemberInformationsDto) {
    return this.membersInformationsService.create(createMemberInformationDto);
  }

  @Get()
  findAll() {
    return this.membersInformationsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.membersInformationsService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateMemberInformationsDto: UpdateMemberInformationsDto) {
    const memberInformations = await this.membersInformationsService.update(uuid, updateMemberInformationsDto);
    if (!memberInformations) {
      throw new NotFoundException(`MemberInformations with UUID "${uuid}" not found`);
    }
    return memberInformations;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.membersInformationsService.remove(uuid);
  }
}

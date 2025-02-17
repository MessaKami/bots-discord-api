import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { ChannelService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @Get()
  findAll() {
    return this.channelService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.channelService.findOne(uuid);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateChannelDto: UpdateChannelDto) {
    const channel = await this.channelService.update(uuid, updateChannelDto);
    if (!channel) {
      throw new NotFoundException(`Channel with UUID "${uuid}" not found`);
    }
    return channel;
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.channelService.remove(uuid);
  }
} 
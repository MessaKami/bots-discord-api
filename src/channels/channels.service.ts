import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  create(createChannelDto: CreateChannelDto) {
    const channel = this.channelRepository.create(createChannelDto);
    return this.channelRepository.save(channel);
  }

  findAll() {
    return this.channelRepository.find();
  }

  findOne(uuid: string) {
    return this.channelRepository.findOneBy({ uuid });
  }

  async update(uuid: string, updateChannelDto: UpdateChannelDto) {
    const channel = await this.channelRepository.findOneBy({ uuid });
    if (!channel) {
      return null;
    }
    Object.assign(channel, updateChannelDto);
    return this.channelRepository.save(channel);
  }

  remove(uuid: string) {
    return this.channelRepository.delete({ uuid });
  }
} 
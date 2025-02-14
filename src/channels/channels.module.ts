import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channels.service';
import { ChannelController } from './channels.controller';
import { Channel } from './entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService]
})
export class ChannelModule {} 
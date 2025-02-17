import { Module } from '@nestjs/common';

import { MemberInformations } from './entities/member-informations.entity';
import { MembersInformationsService } from './members-informations.service';
import { MembersInformationsController } from './members-informations.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MemberInformations])],
  controllers: [MembersInformationsController],
  providers: [MembersInformationsService],
})
export class MembersInformationsModule {}

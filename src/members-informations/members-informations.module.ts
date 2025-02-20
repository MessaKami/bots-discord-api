import { Module } from '@nestjs/common';
import { MemberInformation } from './entities/member-information.entity';
import { MembersInformationsService } from './members-informations.service';
import { MembersInformationsController } from './members-informations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MemberInformation])],
  controllers: [MembersInformationsController],
  providers: [MembersInformationsService]
})
export class MembersInformationsModule {}

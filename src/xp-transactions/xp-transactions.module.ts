import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XpTransactionsService } from './xp-transactions.service';
import { XpTransactionsController } from './xp-transactions.controller';
import { XpTransaction } from './entities/xp-transaction.entity';
import { Member } from '../members/entities/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([XpTransaction, Member])
  ],
  controllers: [XpTransactionsController],
  providers: [XpTransactionsService]
})
export class XpTransactionsModule {}

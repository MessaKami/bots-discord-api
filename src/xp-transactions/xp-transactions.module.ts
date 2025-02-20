import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XpTransactionsService } from './xp-transactions.service';
import { XpTransactionsController } from './xp-transactions.controller';
import { XpTransaction } from './entities/xp-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([XpTransaction])],
  controllers: [XpTransactionsController],
  providers: [XpTransactionsService],
})
export class XpTransactionsModule {}

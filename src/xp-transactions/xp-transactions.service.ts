import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateXpTransactionDto } from './dto/create-xp-transaction.dto';
import { UpdateXpTransactionDto } from './dto/update-xp-transaction.dto';
import { XpTransaction } from './entities/xp-transaction.entity';

@Injectable()
export class XpTransactionsService {
  constructor(
    @InjectRepository(XpTransaction)
    private xpTransactionRepository: Repository<XpTransaction>
  ) {}

  async create(createXpTransactionDto: CreateXpTransactionDto): Promise<XpTransaction> {
    const xpTransaction = this.xpTransactionRepository.create({
      transaction_type: createXpTransactionDto.amount >= 0 ? 'GAIN' : 'LOSS',
      transaction_value: Math.abs(createXpTransactionDto.amount),
      uuid_member: createXpTransactionDto.userId,
      reason: createXpTransactionDto.reason,
      notes: createXpTransactionDto.notes
    });

    return await this.xpTransactionRepository.save(xpTransaction);
  }

  async findAll(): Promise<XpTransaction[]> {
    return await this.xpTransactionRepository.find();
  }

  async findOne(id: string): Promise<XpTransaction> {
    const xpTransaction = await this.xpTransactionRepository.findOne({
      where: { uuid: id }
    });

    if (!xpTransaction) {
      throw new NotFoundException(`Transaction XP avec l'UUID ${id} non trouvée`);
    }

    return xpTransaction;
  }

  async update(id: string, updateXpTransactionDto: UpdateXpTransactionDto): Promise<XpTransaction> {
    const xpTransaction = await this.findOne(id);
    
    if (updateXpTransactionDto.userId) {
      xpTransaction.uuid_member = updateXpTransactionDto.userId;
    }
    
    if (updateXpTransactionDto.amount !== undefined) {
      xpTransaction.transaction_type = updateXpTransactionDto.amount >= 0 ? 'GAIN' : 'LOSS';
      xpTransaction.transaction_value = Math.abs(updateXpTransactionDto.amount);
    }
    
    if (updateXpTransactionDto.reason) {
      xpTransaction.reason = updateXpTransactionDto.reason;
    }
    
    if (updateXpTransactionDto.notes !== undefined) {
      xpTransaction.notes = updateXpTransactionDto.notes;
    }
    
    return await this.xpTransactionRepository.save(xpTransaction);
  }

  async remove(id: string): Promise<void> {
    const result = await this.xpTransactionRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction XP avec l'UUID ${id} non trouvée`);
    }
  }
}

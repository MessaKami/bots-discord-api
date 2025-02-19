import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    const vote = this.voteRepository.create(createVoteDto);
    return await this.voteRepository.save(vote);
  }

  async findAll(): Promise<Vote[]> {
    return await this.voteRepository.find({
      where: { voteIsActive: true }
    });
  }

  async findOne(id: string): Promise<Vote | null> {
    return await this.voteRepository.findOne({
      where: { voteUuid: id, voteIsActive: true }
    });
  }

  async update(id: string, updateVoteDto: UpdateVoteDto): Promise<Vote | null> {
    const vote = await this.findOne(id);
    if (!vote) {
      return null;
    }
    Object.assign(vote, updateVoteDto);
    return await this.voteRepository.save(vote);
  }

  async remove(id: string): Promise<boolean> {
    const vote = await this.findOne(id);
    if (!vote) {
      return false;
    }
    const result = await this.voteRepository.softDelete(id);
    return result.affected > 0;
  }
}

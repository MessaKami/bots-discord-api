import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentsRepository.create({
      uuid: uuidv4(),
      ...createCommentDto
    });
    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      relations: ['member']
    });
  }

  async findOne(uuid: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { uuid },
      relations: ['member']
    });
    
    if (!comment) {
      throw new NotFoundException(`Commentaire avec l'UUID ${uuid} non trouvé`);
    }
    
    return comment;
  }

  async update(uuid: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(uuid);
    
    Object.assign(comment, updateCommentDto);
    
    return await this.commentsRepository.save(comment);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.commentsRepository.delete(uuid);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Commentaire avec l'UUID ${uuid} non trouvé`);
    }
  }
}

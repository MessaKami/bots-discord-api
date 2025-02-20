import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Comment> {
    return this.commentsService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string, 
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    return this.commentsService.update(uuid, updateCommentDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.commentsService.remove(uuid);
  }
}

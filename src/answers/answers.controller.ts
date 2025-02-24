import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new answer',
    description: 'Creates a new answer in the database with the provided information.'
  })
  @ApiBody({ type: CreateAnswerDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Answer successfully created.',
    type: Answer 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid data provided in the request.' 
  })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all answers',
    description: 'Returns the list of all answers stored in the database.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all answers successfully retrieved.',
    type: [Answer] 
  })
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get an answer by UUID',
    description: 'Returns a single answer based on its UUID.'
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the answer to retrieve',
    type: String,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer successfully retrieved.',
    type: Answer
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Answer with the specified UUID was not found.'
  })
  findOne(@Param('uuid') uuid: string) {
    return this.answersService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiOperation({
    summary: 'Update an answer',
    description: 'Updates an existing answer based on its UUID with the provided information.'
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the answer to update',
    type: String,
    required: true
  })
  @ApiBody({ type: UpdateAnswerDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer successfully updated.',
    type: Answer
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Answer with the specified UUID was not found.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided in the request.'
  })
  async update(@Param('uuid') uuid: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answersService.update(uuid, updateAnswerDto);
    if (!answer) {
      throw new NotFoundException(`Answer with UUID "${uuid}" not found`);
    }
    return answer;
  }

  @Delete(':uuid')
  @ApiOperation({
    summary: 'Supprimer une réponse',
    description: 'Supprime une réponse existante en fonction de son UUID.'
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID de la réponse à supprimer',
    type: String,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La réponse a été supprimée avec succès.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'La réponse avec l\'UUID spécifié n\'a pas été trouvée.'
  })
  remove(@Param('uuid') uuid: string) {
    return this.answersService.remove(uuid);
  }
}

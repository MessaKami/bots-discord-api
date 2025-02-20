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
    summary: 'Créer une nouvelle réponse',
    description: 'Crée une nouvelle réponse dans la base de données avec les informations fournies.'
  })
  @ApiBody({ type: CreateAnswerDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'La réponse a été créée avec succès.',
    type: Answer 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides fournies dans la requête.' 
  })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Récupérer toutes les réponses',
    description: 'Retourne la liste de toutes les réponses enregistrées dans la base de données.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Liste de toutes les réponses récupérée avec succès.',
    type: [Answer] 
  })
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.answersService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiOperation({
    summary: 'Mettre à jour une réponse',
    description: 'Met à jour une réponse existante en fonction de son UUID avec les nouvelles informations fournies.'
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID de la réponse à mettre à jour',
    type: String,
    required: true
  })
  @ApiBody({ type: UpdateAnswerDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La réponse a été mise à jour avec succès.',
    type: Answer
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'La réponse avec l\'UUID spécifié n\'a pas été trouvée.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides fournies dans la requête.'
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
  remove(@Param('uuid') uuid: string) {
    return this.answersService.remove(uuid);
  }
}

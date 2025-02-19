import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Member } from './entities/member.entity';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Créer un nouveau membre',
    description: 'Crée un nouveau membre dans la base de données avec les informations fournies.'
  })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Le membre a été créé avec succès.',
    type: Member 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides fournies dans la requête.' 
  })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Récupérer tous les membres',
    description: 'Retourne la liste de tous les membres enregistrés dans la base de données.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Liste de tous les membres récupérée avec succès.',
    type: [Member] 
  })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ 
    summary: 'Récupérer un membre par son UUID',
    description: 'Recherche et retourne un membre spécifique en utilisant son UUID.'
  })
  @ApiParam({ 
    name: 'uuid', 
    description: 'UUID unique du membre à rechercher',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Le membre a été trouvé et récupéré avec succès.',
    type: Member 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Aucun membre trouvé avec l\'UUID fourni.' 
  })
  findOne(@Param('uuid') uuid: string) {
    return this.membersService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ 
    summary: 'Mettre à jour un membre',
    description: 'Met à jour les informations d\'un membre existant en utilisant son UUID.'
  })
  @ApiParam({ 
    name: 'uuid', 
    description: 'UUID unique du membre à mettre à jour',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Le membre a été mis à jour avec succès.',
    type: Member 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides fournies dans la requête.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Aucun membre trouvé avec l\'UUID fourni.' 
  })
  update(@Param('uuid') uuid: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(uuid, updateMemberDto);
  }

  @Delete(':uuid')
  @ApiOperation({ 
    summary: 'Supprimer un membre',
    description: 'Supprime un membre existant de la base de données en utilisant son UUID.'
  })
  @ApiParam({ 
    name: 'uuid', 
    description: 'UUID unique du membre à supprimer',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Le membre a été supprimé avec succès.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Aucun membre trouvé avec l\'UUID fourni.' 
  })
  remove(@Param('uuid') uuid: string) {
    return this.membersService.remove(uuid);
  }
}

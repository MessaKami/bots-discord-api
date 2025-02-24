import { Controller, Post, Get, Put, Delete, Param, Body, HttpStatus } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.entity";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService) {}

    @Post()
    @ApiOperation({ summary: 'Créer une nouvelle formation' })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'La formation a été créée avec succès.',
        type: Course 
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: 'Données invalides fournies.'
    })
    @ApiResponse({ 
        status: HttpStatus.CONFLICT, 
        description: 'Une formation avec ce nom existe déjà.'
    })
    async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.courseService.create(createCourseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Récupérer toutes les formations' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Liste des formations récupérée avec succès.',
        type: [Course]
    })
    async findAll(): Promise<Course[]> {
        return this.courseService.findAll();
    }

    @Get(':uuid')
    @ApiOperation({ 
        summary: 'Récupérer une formation par son UUID',
        description: 'Retourne les détails d\'une formation spécifique'
    })
    @ApiParam({ 
        name: 'uuid', 
        description: 'UUID de la formation',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'La formation a été trouvée.',
        type: Course 
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: 'Formation non trouvée.'
    })
    async getByUUID(@Param('uuid') uuid: string): Promise<Course> {
        return this.courseService.getByUUID(uuid);
    }

    @Put(':uuid')
    @ApiOperation({ 
        summary: 'Mettre à jour une formation',
        description: 'Met à jour les informations d\'une formation existante'
    })
    @ApiParam({ 
        name: 'uuid', 
        description: 'UUID de la formation',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'La formation a été mise à jour avec succès.',
        type: Course 
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: 'Données invalides fournies.'
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: 'Formation non trouvée.'
    })
    @ApiResponse({ 
        status: HttpStatus.CONFLICT, 
        description: 'Le nouveau nom est déjà utilisé par une autre formation.'
    })
    async updateByUUID(
        @Param('uuid') uuid: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        return this.courseService.updateByUUID(uuid, updateCourseDto);
    }

    @Delete(':uuid')
    @ApiOperation({ 
        summary: 'Supprimer une formation',
        description: 'Supprime une formation existante'
    })
    @ApiParam({ 
        name: 'uuid', 
        description: 'UUID de la formation',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: HttpStatus.NO_CONTENT, 
        description: 'La formation a été supprimée avec succès.'
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: 'Formation non trouvée.'
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: 'Erreur lors de la suppression de la formation.'
    })
    async deleteByUUID(@Param('uuid') uuid: string): Promise<void> {
        return this.courseService.deleteByUUID(uuid);
    }
}


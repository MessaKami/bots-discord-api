import { Controller, Post, Get, Put, Delete, Param, Body } from "@nestjs/common";
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
        status: 201, 
        description: 'La formation a été créée avec succès.',
        type: Course 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Données invalides fournies.'
    })
    @ApiResponse({ 
        status: 409, 
        description: 'Une formation avec ce nom existe déjà.'
    })
    async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.courseService.create(createCourseDto);
    }

    @Get(':uuidCourse')
    @ApiOperation({ 
        summary: 'Récupérer une formation par son UUID',
        description: 'Retourne les détails d\'une formation spécifique'
    })
    @ApiParam({ 
        name: 'uuidCourse', 
        description: 'UUID de la formation',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'La formation a été trouvée.',
        type: Course 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Formation non trouvée.'
    })
    async getByUUID(@Param('uuidCourse') uuidCourse: string): Promise<Course> {
        return this.courseService.getByUUID(uuidCourse);
    }

    @Put(':uuidCourse')
    @ApiOperation({ 
        summary: 'Mettre à jour une formation',
        description: 'Met à jour les informations d\'une formation existante'
    })
    @ApiParam({ 
        name: 'uuidCourse', 
        description: 'UUID de la formation',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'La formation a été mise à jour avec succès.',
        type: Course 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Données invalides fournies.'
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Formation non trouvée.'
    })
    @ApiResponse({ 
        status: 409, 
        description: 'Le nouveau nom est déjà utilisé par une autre formation.'
    })
    async updateByUUID(
        @Param('uuidCourse') uuidCourse: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        return this.courseService.updateByUUID(uuidCourse, updateCourseDto);
    }

    @Delete(':uuidCourse')
    @ApiOperation({ 
        summary: 'Supprimer une formation',
        description: 'Supprime une formation existante'
    })
    @ApiParam({ 
        name: 'uuidCourse', 
        description: 'UUID de la formation',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: 204, 
        description: 'La formation a été supprimée avec succès.'
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Formation non trouvée.'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Erreur lors de la suppression de la formation.'
    })
    async deleteByUUID(@Param('uuidCourse') uuidCourse: string): Promise<void> {
        return this.courseService.deleteByUUID(uuidCourse);
    }
}


import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Role } from 'src/roles/entities/role.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        try {
          // Vérifier si un cours existe déjà avec le même nom
          const existingCourse = await this.courseRepository.findOne({
            where: { name: createCourseDto.name },
          });
          if (existingCourse) {
            throw new ConflictException(`Course with name ${createCourseDto.name} already exists`);
          }
    
          // Créer un rôle associé au cours
          const newRole = this.roleRepository.create({
            uuid_role: createCourseDto.uuid_role, // Attendu dans DTO ou généré manuellement
            uuid_guild: createCourseDto.uuid_guild, // Association à une guilde (si applicable)
            name: createCourseDto.name, // Nom du rôle = Nom du cours
            member_count: "0",
            role_position: "0",
            hoist: false,
            color: "#000000",
          });
    
          const savedRole = await this.roleRepository.save(newRole);
    
          // Créer le cours en liant le rôle créé
          const newCourse = this.courseRepository.create({
            ...createCourseDto,
            uuid_role: savedRole.uuid_role, // Associer le rôle au cours
          });
    
          return await this.courseRepository.save(newCourse);
        } catch (error) {
          throw new BadRequestException('Erreur lors de la création du cours: ' + error.message);
        }
      }

    async getByUUID(uuid_course: string): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { uuid_course },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
        });
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuid_course} not found`);
        }
        return course;
    }

    async updateByUUID(uuid_course: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { uuid_course },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels']
        });
    
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuid_course} not found`);
        }
    
        if (updateCourseDto.name) {
            const existingCourse = await this.courseRepository.findOne({
                where: { name: updateCourseDto.name }
            });
    
            if (existingCourse && existingCourse.uuid_course !== uuid_course) {
                throw new ConflictException(`Course with name ${updateCourseDto.name} already exists`);
            }
        }
    
        Object.assign(course, updateCourseDto);
        return await this.courseRepository.save(course);
    }

    async deleteByUUID(uuid_course: string): Promise<void> {
        const course = await this.courseRepository.findOne({ 
            where: { uuid_course } 
        });
        
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuid_course} not found`);
        }
        
        const result = await this.courseRepository.delete({ uuid_course });
    
        if (result.affected === 0) {
            throw new Error('Failed to delete course');
        }
    }
}
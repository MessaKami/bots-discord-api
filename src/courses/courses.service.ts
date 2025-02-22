import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const existingCourse = await this.courseRepository.findOne({
            where: { name: createCourseDto.name }
        });
        if (existingCourse) {
            throw new ConflictException(`Course with name ${createCourseDto.name} already exists`);
        }

        const course = this.courseRepository.create({
            name: createCourseDto.name,
            isCertified: createCourseDto.isCertified,
            uuidGuild: createCourseDto.uuidGuild,
            uuidCategory: createCourseDto.uuidCategory
        });

        return await this.courseRepository.save(course);
    }

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find({
            relations: ['category', 'guild', 'roles', 'promotions', 'channels']
        });
    }

    async getByUUID(uuid: string): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { uuid },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
        });
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuid} not found`);
        }
        return course;
    }

    async updateByUUID(uuid: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { uuid },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels']
        });
    
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuid} not found`);
        }
    
        if (updateCourseDto.name) {
            const existingCourse = await this.courseRepository.findOne({
                where: { name: updateCourseDto.name }
            });
    
            if (existingCourse && existingCourse.uuid !== uuid) {
                throw new ConflictException(`Course with name ${updateCourseDto.name} already exists`);
            }
        }
    
        Object.assign(course, updateCourseDto);
        return await this.courseRepository.save(course);
    }

    async deleteByUUID(uuid: string): Promise<void> {
        const course = await this.courseRepository.findOne({ 
            where: { uuid } 
        });
        
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuid} not found`);
        }
        
        const result = await this.courseRepository.delete({ uuid });
    
        if (result.affected === 0) {
            throw new Error('Failed to delete course');
        }
    }
}
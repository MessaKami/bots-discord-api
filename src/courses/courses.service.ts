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
        });

        return await this.courseRepository.save(course);
    }

    async getByUUID(uuidCourse: string): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { uuidCourse },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
        });
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuidCourse} not found`);
        }
        return course;
    }

    async updateByUUID(uuidCourse: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { uuidCourse },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels']
        });
    
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuidCourse} not found`);
        }
    
        if (updateCourseDto.name) {
            const existingCourse = await this.courseRepository.findOne({
                where: { name: updateCourseDto.name }
            });
    
            if (existingCourse && existingCourse.uuidCourse !== uuidCourse) {
                throw new ConflictException(`Course with name ${updateCourseDto.name} already exists`);
            }
        }
    
        Object.assign(course, updateCourseDto);
        return await this.courseRepository.save(course);
    }

    async deleteByUUID(uuidCourse: string): Promise<void> {
        const course = await this.courseRepository.findOne({ 
            where: { uuidCourse } 
        });
        
        if (!course) {
            throw new NotFoundException(`Course with UUID ${uuidCourse} not found`);
        }
        
        const result = await this.courseRepository.delete({ uuidCourse });
    
        if (result.affected === 0) {
            throw new Error('Failed to delete course');
        }
    }
}
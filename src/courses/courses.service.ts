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
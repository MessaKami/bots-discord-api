import { Controller, Post, Get, Put, Delete, Param, Body } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.entity";

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService) {}

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.courseService.create(createCourseDto);
    }

    @Get(':uuidCourse')
    async getByUUID(@Param('uuidCourse') uuidCourse: string): Promise<Course> {
        return this.courseService.getByUUID(uuidCourse);
    }

    @Put(':uuidCourse')
    async updateByUUID(
        @Param('uuidCourse') uuidCourse: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        return this.courseService.updateByUUID(uuidCourse, updateCourseDto);
    }

    @Delete(':uuidCourse')
    async deleteByUUID(@Param('uuidCourse') uuidCourse: string): Promise<void> {
        return this.courseService.deleteByUUID(uuidCourse);
    }
}


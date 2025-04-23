import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Only authenticated users can create
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get() // Public access
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id') // Public access
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Only authenticated users can update
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Only authenticated users can delete
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
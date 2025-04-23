import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(dto: CreateCourseDto) {
    return this.courseModel.create(dto);
  }

  async findAll() {
    return this.courseModel.find().exec();
  }

  async findOne(id: string) {
    return this.courseModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}


import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { JwtCustomModule } from '../auth/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  JwtCustomModule,
],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}


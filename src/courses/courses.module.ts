import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { CourseSchema } from './schemas/course.schema';
import { PersonSchema } from 'src/person.base';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      {
        name: 'Person',
        schema: PersonSchema,
        discriminators: [
          { name: 'Teacher', schema: TeacherSchema },
        ],
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './schemas/teacher.schema';
import { PersonSchema } from 'src/person.base';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Person',
        schema: PersonSchema,
        discriminators: [{ name: 'Teacher', schema: TeacherSchema }],
      },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}

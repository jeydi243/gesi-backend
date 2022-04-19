import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student, StudentSchema } from './schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Responsable, ResponsableSchema } from './schemas/responsable.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Responsable.name, schema: ResponsableSchema },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}

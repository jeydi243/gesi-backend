import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Person, PersonSchema } from 'src/person.base';
import { Student, StudentSchema } from 'src/students/schemas/student.schema';
import { Teacher, TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';
import { DocumentOrg, DocumentOrgSchema } from './schemas/document.schema';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { Filiere, FiliereSchema } from './schemas/filiere.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentOrg.name, schema: DocumentOrgSchema },
      { name: Filiere.name, schema: FiliereSchema },
      {
        name: Person.name,
        schema: PersonSchema,
        discriminators: [
          { name: Employee.name, schema: EmployeeSchema },
          // { name: Student.name, schema: StudentSchema },
          // { name: Teacher.name, schema: TeacherSchema },
        ],
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ManagementController],
  providers: [ManagementService],
})
export class ManagementModule {}

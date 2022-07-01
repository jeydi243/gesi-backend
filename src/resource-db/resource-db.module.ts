import { Global, Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManagementService } from 'src/management/management.service';
import { DocumentOrg, DocumentOrgSchema } from 'src/management/schemas/document.schema';
import { Employee, EmployeeSchema } from 'src/management/schemas/employee.schema';
import { Filiere, FiliereSchema } from 'src/management/schemas/filiere.schema';
import { EmployeeService } from 'src/management/services/employee.service';
import { PersonSchema } from 'src/person.base';
import { Student, StudentSchema } from 'src/students/schemas/student.schema';
import { StudentsService } from 'src/students/students.service';
import { Teacher, TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { TeachersService } from 'src/teachers/teachers.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DocumentOrg', schema: DocumentOrgSchema },
      { name: 'Filiere', schema: FiliereSchema },
      {
        name: 'Person',
        schema: PersonSchema,
        discriminators: [
          { name: 'Employee', schema: EmployeeSchema },
          { name: 'Teacher', schema: TeacherSchema },
          { name: 'Student', schema: StudentSchema },
        ],
      },
    ]),
  ],
  providers: [TeachersService, ManagementService, StudentsService, EmployeeService],
  exports: [],
})
export class ResourceDbModule {
  constructor(
    @InjectModel('Teacher') teacherModel: Model<Teacher>,
    @InjectModel('Employee') private employeeModel: Model<Employee>,
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('DocumentOrg') private documentOrgModel: Model<DocumentOrg>,
    @InjectModel('Filiere') private filiereModel: Model<Filiere>,
  ) {}
}

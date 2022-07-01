import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from 'src/courses/courses.service';
import { CourseSchema } from 'src/courses/schemas/course.schema';
import { ManagementService } from 'src/management/management.service';
import { DocumentOrgSchema } from 'src/management/schemas/document.schema';
import { EmployeeSchema } from 'src/management/schemas/employee.schema';
import { FiliereSchema } from 'src/management/schemas/filiere.schema';
import { EmployeeService } from 'src/management/services/employee.service';
import { PersonSchema } from 'src/person.base';
import { ResponsableSchema } from 'src/students/schemas/responsable.schema';
import { StudentSchema } from 'src/students/schemas/student.schema';
import { StudentsService } from 'src/students/students.service';
import { TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { TeachersService } from 'src/teachers/teachers.service';
import { UserSchema } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DocumentOrg', schema: DocumentOrgSchema },
      { name: 'Filiere', schema: FiliereSchema },
      { name: 'Responsable', schema: ResponsableSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
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
  providers: [
    TeachersService,
    ManagementService,
    StudentsService,
    EmployeeService,
    UsersService,
    UsersService,
    CoursesService,
  ],
  exports: [
    TeachersService,
    ManagementService,
    StudentsService,
    EmployeeService,
    UsersService,
    UsersService,
    CoursesService,
  ],
})
export class ResourceDbModule {
  // constructor(
  //   @InjectModel('Teacher') teacherModel: Model<Teacher>,
  //   @InjectModel('Employee') private employeeModel: Model<Employee>,
  //   @InjectModel('Student') private studentModel: Model<Student>,
  //   @InjectModel('DocumentOrg') private documentOrgModel: Model<DocumentOrg>,
  //   @InjectModel('Filiere') private filiereModel: Model<Filiere>,
  // ) {}
}

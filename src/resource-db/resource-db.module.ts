import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from 'src/courses/courses.service';
import { CourseSchema } from 'src/courses/schemas/course.schema';
import { ManagementService } from 'src/management/services/management.service';
import { CourseSessionSchema } from 'src/management/schemas/course_session.schema';
import { DocumentOrganisationSchema } from 'src/management/schemas/document.schema';
import { EmployeeSchema } from 'src/management/schemas/employee.schema';
import { EventSchema } from 'src/management/schemas/event.schema';
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
      { name: 'DocumentOrganisation', schema: DocumentOrganisationSchema },
      { name: 'Filiere', schema: FiliereSchema },
      { name: 'Responsable', schema: ResponsableSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
      {
        name: 'Event',
        schema: EventSchema,
        discriminators: [
          { name: 'CourseSession', schema: CourseSessionSchema },
        ],
      },
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
  providers: [TeachersService, ManagementService, StudentsService, EmployeeService, UsersService, UsersService, CoursesService],
  exports: [TeachersService, ManagementService, StudentsService, EmployeeService, UsersService, UsersService, CoursesService],
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

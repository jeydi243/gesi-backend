import { UserSchema } from 'src/users/schemas/user.schema';
import { EventSchema } from 'src/management/schemas/event.schema';
import { CourseSchema } from 'src/courses/schemas/course.schema';
import { UsersService } from 'src/users/users.service';
import { PersonSchema } from 'src/config/person.base';
import { FiliereSchema } from 'src/management/schemas/filiere.schema';
import { StudentSchema } from 'src/students/schemas/student.schema';
import { TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from 'src/courses/courses.service';
import { EmployeeSchema } from 'src/management/schemas/employee.schema';
import { EmployeeService } from 'src/management/services/employee.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { ResourceService } from './resource.service';
import { ManagementService } from 'src/management/services/management.service';
import { ResponsableSchema } from 'src/students/schemas/responsable.schema';
import { ResourceController } from './resource.controller';
import { CourseSessionSchema } from 'src/management/schemas/course_session.schema';
import { DocumentOrganizationSchema } from 'src/management/schemas/document.schema';
import { GridFsMulterConfigService } from './storage';
import { MulterModule } from '@nestjs/platform-express';
import { OrganizationSchema } from 'src/management/schemas/organization.schema';
import { OrganizationService } from 'src/management/services/organization.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'DocumentOrganization', schema: DocumentOrganizationSchema },
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'Responsable', schema: ResponsableSchema },
      { name: 'Filiere', schema: FiliereSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
      {
        name: 'Event',
        schema: EventSchema,
        discriminators: [{ name: 'CourseSession', schema: CourseSessionSchema }],
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
  controllers: [ResourceController],
  exports: [TeachersService, ManagementService, OrganizationService, StudentsService, EmployeeService, CoursesService, ResourceService, UsersService, MongooseModule],
  providers: [TeachersService, ManagementService, OrganizationService, StudentsService, EmployeeService, UsersService, CoursesService, ResourceService, GridFsMulterConfigService],
})
export class ResourceDbModule {}

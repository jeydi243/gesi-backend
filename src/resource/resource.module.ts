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
import { DocumentOrganisationSchema } from 'src/management/schemas/document.schema';
import { GridFsMulterConfigService } from './storage';
import { MulterModule } from '@nestjs/platform-express';
// import { MulterModule } from '@nestjs/platform-express';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
@Global()
@Module({
  imports: [
    JwtModule.register({ secret: 'jeydi243' }),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'DocumentOrganisation', schema: DocumentOrganisationSchema },
      { name: 'Filiere', schema: FiliereSchema },
      { name: 'Responsable', schema: ResponsableSchema },
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
  exports: [TeachersService, ManagementService, StudentsService, EmployeeService, CoursesService, ResourceService, UsersService],
  providers: [TeachersService, ManagementService, StudentsService, EmployeeService, UsersService, CoursesService, ResourceService, GridFsMulterConfigService],
})
export class ResourceDbModule {}

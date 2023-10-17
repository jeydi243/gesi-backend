import { UserSchema } from 'src/users/schemas/user.schema';
import { EventSchema } from 'src/management/schemas/event.schema';
import { ContentSchema } from 'src/courses/schemas/content.schema';
import { UsersService } from 'src/users/users.service';
import { PersonSchema } from 'src/person.base';
import { FiliereSchema } from 'src/management/schemas/filiere.schema';
import { StudentSchema } from 'src/students/schemas/student.schema';
import { TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsService } from 'src/courses/contents.service';
import { EmployeeSchema } from 'src/management/schemas/employee.schema';
import { EmployeeService } from 'src/management/services/employee.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { ResourceService } from './resource.service';
import { ManagementService } from 'src/management/services/management.service';
import { ResponsableSchema } from 'src/students/schemas/responsable.schema';
import { ResourceController } from './resource.controller';
import { ContentSessionSchema } from 'src/management/schemas/content_session.schema';
import { DocumentOrganisationSchema } from 'src/management/schemas/document.schema';
import { GridFsMulterConfigService } from './storage';
import { MulterModule } from '@nestjs/platform-express';
import { StudentServiceSchema } from 'src/management/schemas/student-service.schema';
import { ServiceRequestSchema } from 'src/management/schemas/StudentServiceRequests.schema';
import { StudentService } from 'src/management/services/student-services.service';
import { OrganizationService } from 'src/management/services/organization.service';
import { OrganizationSchema } from 'src/management/schemas/organization.schema';
// import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'DocumentOrganisation', schema: DocumentOrganisationSchema },
      { name: 'Filiere', schema: FiliereSchema },
      { name: 'Responsable', schema: ResponsableSchema },
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'StudentService', schema: StudentServiceSchema },
      { name: 'ServiceRequest', schema: ServiceRequestSchema },
      { name: 'Content', schema: ContentSchema },
      { name: 'User', schema: UserSchema },
      {
        name: 'Event',
        schema: EventSchema,
        discriminators: [{ name: 'ContentSession', schema: ContentSessionSchema }],
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
  providers: [
    TeachersService,
    ManagementService,
    StudentsService,
    EmployeeService,
    UsersService,
    UsersService,
    ContentsService,
    ResourceService,
    GridFsMulterConfigService,
    StudentService,
    OrganizationService,
  ],
  exports: [
    TeachersService,
    ManagementService,
    StudentsService,
    EmployeeService,
    UsersService,
    OrganizationService,
    UsersService,
    ContentsService,
    ResourceService,
    StudentService,
  ],
})
export class ResourceDbModule {}

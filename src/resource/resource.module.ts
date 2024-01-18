import { UserSchema } from '../users/schemas/user.schema';
import { EventSchema } from '../management/schemas/event.schema';
import { ContentSchema } from '../courses/schemas/content.schema';
import { UsersService } from '../users/users.service';
import { PersonSchema } from '../person.base';
import { StudentSchema } from '../students/schemas/student.schema';
import { TeacherSchema } from '../teachers/schemas/teacher.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ContentsService } from '../courses/contents.service';
import { EmployeeSchema } from '../management/schemas/employee.schema';
import { EmployeeService } from '../management/services/employee.service';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { ResourceService } from './resource.service';
import { ManagementService } from '../management/services/management.service';
import { ResponsableSchema } from '../students/schemas/responsable.schema';
import { ResourceController } from './resource.controller';
import { ContentSessionSchema } from '../management/schemas/content_session.schema';
import { DocumentOrganisationSchema } from '../management/schemas/document.schema';
import { GridFsMulterConfigService } from './storage';
import { StudentServiceSchema } from '../management/schemas/student-service.schema';
import { ServiceRequestSchema } from '../management/schemas/serviceRequests.schema';
import { StudentService } from '../management/services/student-services.service';
import { OrganizationService } from '../management/services/organization.service';
import { OrganizationSchema } from '../management/schemas/organization.schema';
import { ClasseSchema } from '../management/schemas/classe.schema';
import { ClasseService } from '../management/services/classe.service';
import { LookupsSchema } from '../management/schemas/lookups.schema';
import { PositionSchema } from 'src/management/schemas/position.schema';
import { AssignmentSchema } from 'src/management/schemas/assignment.schema';
// import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'DocumentOrganisation', schema: DocumentOrganisationSchema },
      { name: 'Responsable', schema: ResponsableSchema },
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'Classe', schema: ClasseSchema },
      { name: 'Lookups', schema: LookupsSchema },
      { name: 'StudentService', schema: StudentServiceSchema },
      { name: 'ServiceRequest', schema: ServiceRequestSchema },
      { name: 'Content', schema: ContentSchema },
      { name: 'Position', schema: PositionSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Assignment', schema: AssignmentSchema },
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
    ClasseService,
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
    ClasseService,
  ],
})
export class ResourceDbModule {}

import { UserSchema } from 'src/users/schemas/user.schema';
import { EventSchema } from 'src/management/schemas/event.schema';
import { ContentSchema } from 'src/contents/schemas/content.schema';
import { UsersService } from 'src/users/users.service';
import { PersonSchema } from 'src/config/person.base';
import { FiliereSchema } from 'src/management/schemas/filiere.schema';
import { StudentSchema } from 'src/students/schemas/student.schema';
import { TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsService } from 'src/contents/contents.service';
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
import { OrganizationSchema } from 'src/management/schemas/organization.schema';
import { LookupsSchema } from 'src/management/schemas/lookups.schema';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'DocumentOrganisation', schema: DocumentOrganisationSchema },
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'Responsable', schema: ResponsableSchema },
      { name: 'Filiere', schema: FiliereSchema },
      { name: 'Content', schema: ContentSchema },
      { name: 'Lookups', schema: LookupsSchema },
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
  exports: [TeachersService, ManagementService, StudentsService, EmployeeService, ContentsService, ResourceService, UsersService, MongooseModule],
  providers: [TeachersService, ManagementService, StudentsService, EmployeeService, UsersService, ContentsService, ResourceService, GridFsMulterConfigService, MongooseModule],
})
export class ResourceDbModule {}

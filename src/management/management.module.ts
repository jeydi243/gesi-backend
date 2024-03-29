import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { EmployeeController } from './controllers/employee.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudentServiceController } from './controllers/student-services.controller';
import OrgsController from './controllers/orgs.controller';
import { ClasseController } from './controllers/classe.controller';
import { LookupsController } from './controllers/lookups.controller';
import { PositionController } from './controllers/position.controller';
import { AssignmentController } from './controllers/assignment.controller';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [ManagementController, EmployeeController, StudentServiceController, OrgsController, ClasseController, LookupsController, PositionController, AssignmentController],
  providers: [],
})
export class ManagementModule {}

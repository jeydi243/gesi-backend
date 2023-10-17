import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { EmployeeController } from './controllers/employee.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { MulterModule } from '@nestjs/platform-express';
import { StudentServiceController } from './controllers/student-services.controller';
import OrgsController from './controllers/orgs.controller';
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [ManagementController, EmployeeController, StudentServiceController, OrgsController],
  providers: [GridFsMulterConfigService],
})
export class ManagementModule {}

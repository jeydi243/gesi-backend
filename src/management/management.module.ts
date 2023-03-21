import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { EmployeeController } from './employee.controller';
import { ManagementController } from './management.controller';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { EmployeeService } from './services/employee.service';
import { OrganizationService } from './services/organization.service';
import { ManagementService } from './services/management.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [ManagementController, EmployeeController],
  providers: [GridFsMulterConfigService, EmployeeService, OrganizationService, ManagementService],
  exports: [GridFsMulterConfigService, EmployeeService, OrganizationService, ManagementService],
})
export class ManagementModule {}

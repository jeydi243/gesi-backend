import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { EmployeeController } from './employee.controller';
import { ManagementController } from './management.controller';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { EmployeeService } from './services/employee.service';
import { OrganizationService } from './services/organization.service';
import { ManagementService } from './services/management.service';
import LookupsController from './lookups.controller';
import { LookupsService } from './services/lookups.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [ManagementController, EmployeeController, LookupsController],
  providers: [GridFsMulterConfigService, EmployeeService, OrganizationService, ManagementService, LookupsService],
  exports: [GridFsMulterConfigService, EmployeeService, OrganizationService, ManagementService, LookupsService],
})
export class ManagementModule {}

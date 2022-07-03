import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ManagementController } from './management.controller';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ManagementController, EmployeeController],
  providers: [],
})
export class ManagementModule {}

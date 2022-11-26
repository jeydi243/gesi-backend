import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { EmployeeController } from './employee.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [ManagementController, EmployeeController],
  providers: [],
})
export class ManagementModule {}

import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { EmployeeController } from './employee.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [ManagementController, EmployeeController],
  providers: [GridFsMulterConfigService],
})
export class ManagementModule {}

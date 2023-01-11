import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { ResourceDbModule } from 'src/resource/resource.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/resource/storage';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    ResourceDbModule,
  ],
  controllers: [TeachersController],
  providers: [],
})
export class TeachersModule {}

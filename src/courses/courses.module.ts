import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

import { Global, Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { ResourceDbModule } from 'src/resource/resource.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { StudentsService } from './students.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}

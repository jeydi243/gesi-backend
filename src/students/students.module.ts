import { Global, Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { ResourceDbModule } from 'src/resource/resource.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/resource/storage';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [StudentsController],
  providers: [],
})
export class StudentsModule {}

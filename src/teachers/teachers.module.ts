import { Global, Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { ResourceDbModule } from 'src/resource/resource.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { TeachersService } from './teachers.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}

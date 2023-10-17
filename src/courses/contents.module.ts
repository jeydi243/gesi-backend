import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/resource/storage';
import { ContentsController } from './contents.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [ContentsController],
  providers: [],
})
export class ContentsModule {}

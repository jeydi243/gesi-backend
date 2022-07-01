import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';
import { ResourceDbModule } from 'src/resource-db/resource-db.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ManagementController],
  providers: [],
})
export class ManagementModule {}

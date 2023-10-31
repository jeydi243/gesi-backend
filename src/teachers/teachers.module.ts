import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { ResourceDbModule } from 'src/resource/resource.module';

@Module({
  imports: [
    ResourceDbModule,
  ],
  controllers: [TeachersController],
  providers: [],
})
export class TeachersModule {}

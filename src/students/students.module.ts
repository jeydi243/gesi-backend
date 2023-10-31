import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { ResourceDbModule } from 'src/resource/resource.module';

@Module({
  imports: [
    ResourceDbModule,
  ],
  controllers: [StudentsController],
  providers: [],
})
export class StudentsModule {}

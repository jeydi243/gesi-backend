import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { ResourceDbModule } from 'src/resource-db/resource-db.module';

@Module({
  imports: [
    ResourceDbModule,
  ],
  controllers: [StudentsController],
  providers: [],
})
export class StudentsModule {}

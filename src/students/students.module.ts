import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StudentsController } from './students.controller';
import { ResourceDbModule } from 'src/resource-db/resource-db.module';

@Module({
  imports: [
    ResourceDbModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [StudentsController],
  providers: [],
})
export class StudentsModule {}

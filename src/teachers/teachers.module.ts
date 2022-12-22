import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { ResourceDbModule } from 'src/resource-db/resource-db.module';

@Module({
  imports: [ResourceDbModule],
  controllers: [TeachersController],
  providers: [],
})
export class TeachersModule {}

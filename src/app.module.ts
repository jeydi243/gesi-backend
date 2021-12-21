import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [StudentsModule, ProfessorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

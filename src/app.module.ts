import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [
    StudentsModule,
    ProfessorsModule,
    MongooseModule.forRoot('mongodb://localhost/gesi'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

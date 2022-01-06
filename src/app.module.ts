import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { EventGateway } from './event.gateway';
import * as helmet from 'helmet';

@Module({
  imports: [
    StudentsModule,
    ProfessorsModule,
    MongooseModule.forRoot('mongodb://localhost/gesi'),
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

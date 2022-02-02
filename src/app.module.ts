import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { UsersModule } from './user/users.module';
import * as helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    // MongooseModule.forRoot('mongodb://localhost/gesi'), //for use in production
    MongooseModule.forRoot(process.env.MONGO_DEV_URI),
    // MongooseModule.forRoot(process.env.MONGO_PROD_URI),
    StudentsModule,
    ProfessorsModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import * as helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule } from './courses/courses.module';
import { ManagementModule } from './management/management.module';
import { ResourceDbModule } from './resource-db/resource-db.module';
import { FilesModule } from './resource-db/file.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot('mongodb://localhost/gesi'), //for use in production

    MongooseModule.forRoot(process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD, {}),
    FilesModule,
    ResourceDbModule,
    StudentsModule,
    TeachersModule,
    UsersModule,
    CoursesModule,
    ManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

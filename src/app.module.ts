import * as helmet from 'helmet';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ContentsModule } from './courses/contents.module';
import { ManagementModule } from './management/management.module';
import { ResourceDbModule } from './resource/resource.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();
import 'dotenv/config'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_ATLAS_URI, { directConnection: true, replicaSet: 'foo' }),
    MongooseModule.forRoot(process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_ATLAS_URI),
    UsersModule,
    ContentsModule,
    TeachersModule,
    StudentsModule,
    ManagementModule,
    ResourceDbModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

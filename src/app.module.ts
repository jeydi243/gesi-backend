import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import * as helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { ManagementModule } from './management/management.module';
import { ResourceDbModule } from './resource/resource.module';
import { MyJwtStrategy } from './users/myjwt.strategy';
import { JwtModule } from '@nestjs/jwt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD, { directConnection: true, replicaSet: 'foo' }),
    JwtModule.register({ secret: 'jeydi243' }),
    UsersModule,
    CoursesModule,
    TeachersModule,
    StudentsModule,
    ManagementModule,
    ResourceDbModule,
  ],
  controllers: [],
  providers: [MyJwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

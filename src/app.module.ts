import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MyJwtStrategy } from './users/strategy/myjwt.strategy';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import * as helmet from 'helmet';
import { ManagementModule } from './management/management.module';
import { ResourceDbModule } from './resource/resource.module';
import { ServeStaticModule } from '@nestjs/serve-static';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD, { directConnection: true, replicaSet: 'foo' }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

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

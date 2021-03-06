import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import * as helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import { RootController } from './root.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/schemas/user.schema';
import { JwtStrategy } from './users/jwt.strategy';
import { CoursesModule } from './courses/courses.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot('mongodb://localhost/gesi'), //for use in production

    MongooseModule.forRoot(
      process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    StudentsModule,
    TeachersModule,
    UsersModule,
    CoursesModule,
    ManagementModule,
  ],
  controllers: [RootController],
  providers: [UsersService, RootController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

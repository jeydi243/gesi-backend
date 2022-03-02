import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './user/users.module';
import * as helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import { RootController } from './root.controller';
import { UsersService } from './user/users.service';
import { User, UserSchema } from './user/schemas/user.schema';
import { JwtStrategy } from './user/jwt.strategy';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot('mongodb://localhost/gesi'), //for use in production

    MongooseModule.forRoot(
      process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    StudentsModule,
    TeachersModule,
    UsersModule,
    CoursesModule,
  ],
  controllers: [RootController],
  providers: [UsersService, RootController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

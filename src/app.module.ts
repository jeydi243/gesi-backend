import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { UsersModule } from './user/users.module';
import * as helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import { RootController } from './root.controller';
import { UsersService } from './user/users.service';
import { User, UserSchema } from './user/schemas/user.schema';
import { JwtStrategy } from './user/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot('mongodb://localhost/gesi'), //for use in production
    MongooseModule.forRoot(process.env.MONGO_DEV_URI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    StudentsModule,
    ProfessorsModule,
    UsersModule,
  ],
  controllers: [RootController],
  providers: [UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes().apply(helmet());
  }
}

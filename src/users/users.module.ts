import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { TeachersService } from 'src/teachers/teachers.service';
import { StudentsService } from 'src/students/students.service';
import { ResourceDbModule } from 'src/resource-db/resource-db.module';

@Module({
  imports: [
    ResourceDbModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.register({ secret: 'jeydi243' }),
    TeachersModule,
    StudentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, TeachersService, StudentsService, JwtStrategy],
})
export class UsersModule {}

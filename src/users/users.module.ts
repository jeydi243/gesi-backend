import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }), JwtModule.register({ secret: 'jeydi243' }), TeachersModule, StudentsModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}

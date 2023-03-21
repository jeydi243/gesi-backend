import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { MyJwtStrategy } from './myjwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { ResourceDbModule } from 'src/resource/resource.module';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }), TeachersModule, StudentsModule, ResourceDbModule],
  controllers: [UsersController],
  providers: [MyJwtStrategy, JwtService, UsersService],
  exports: [MyJwtStrategy, JwtService, UsersService],
})
export class UsersModule {}

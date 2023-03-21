import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { MyJwtStrategy } from './myjwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { UsersController } from './users.controller';
import { ResourceDbModule } from 'src/resource/resource.module';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }), TeachersModule, StudentsModule, ResourceDbModule],
  controllers: [UsersController],
  providers: [MyJwtStrategy, JwtService, UsersService],
  exports: [MyJwtStrategy, JwtService, UsersService],
})
export class UsersModule {}

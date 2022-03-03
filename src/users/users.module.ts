import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { TeachersService } from 'src/teachers/teachers.service';
import { StudentsService } from 'src/students/students.service';
import { Teacher, TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { Student, StudentSchema } from 'src/students/schemas/student.schema';
import { Responsable, ResponsableSchema } from 'src/students/schemas/responsable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Responsable.name, schema: ResponsableSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.register({ secret: 'jeydi243' }),
    TeachersModule,
    StudentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, TeachersService, StudentsService, JwtStrategy],
})
export class UsersModule {}

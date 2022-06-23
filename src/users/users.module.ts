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
import { TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { StudentSchema } from 'src/students/schemas/student.schema';
import { Responsable, ResponsableSchema } from 'src/students/schemas/responsable.schema';
import { PersonSchema } from 'src/person.base';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Responsable.name, schema: ResponsableSchema },

      {
        name: 'Person',
        schema: PersonSchema,
        discriminators: [
          { name: 'Teacher', schema: TeacherSchema },
          { name: 'Student', schema: StudentSchema },
        ],
      },
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

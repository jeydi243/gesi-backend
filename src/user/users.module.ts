import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ProfessorsModule } from 'src/professors/professors.module';
import { StudentsModule } from 'src/students/students.module';
import { ProfessorsService } from 'src/professors/professors.service';
import { StudentsService } from 'src/students/students.service';
import { Professor, ProfessorSchema } from 'src/professors/schemas/professor.schema';
import { Student, StudentSchema } from 'src/students/schemas/student.schema';
import { Responsable, ResponsableSchema } from 'src/students/schemas/responsable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Professor.name, schema: ProfessorSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Responsable.name, schema: ResponsableSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.register({ secret: 'jeydi243' }),
    ProfessorsModule,
    StudentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ProfessorsService, StudentsService, JwtStrategy],
})
export class UsersModule {}

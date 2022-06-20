import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { Person, PersonSchema } from 'src/person.base';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Teacher.name, schema: TeacherSchema },
      // { name: User.name, schema: UserSchema },

      {
        name: Person.name,
        schema: PersonSchema,
        discriminators: [
          // { name: Student.name, schema: StudentSchema },
          { name: Teacher.name, schema: TeacherSchema },
        ],
      },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}

import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Professor, ProfessorSchema } from './schemas/professor.schema';
import { UsersModule } from 'src/user/users.module';
import { UsersService } from 'src/user/users.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  controllers: [ProfessorsController],
  imports: [
    MongooseModule.forFeature([
      { name: Professor.name, schema: ProfessorSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
  ],
  providers: [ProfessorsService, UsersService],
})
export class ProfessorsModule {}

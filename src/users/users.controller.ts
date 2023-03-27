import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Roles } from './decorators/role.decorator';
import { Student } from 'src/students/schemas/student.schema';
import { UserRole } from 'src/config/export.type';
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import * as bcrypt from 'bcrypt';
import { User as UserDec } from './decorators/user.decorator';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
// * JwtAuthGuard et RolesGuard sont des guards executé a la suite, l'ordre est important
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly studentService: StudentsService, private readonly professorService: TeachersService) {}

  @Post('register')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR)
  register(@Body() createUserDto: CreateUserDto): Promise<string | null> {
    return this.usersService.register(createUserDto);
  }

  @Post('logout/:idUser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR)
  logout() {
    return this.usersService.logout();
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<{ [key: string]: any } | string | any> {
    try {
      const user: any = await this.usersService.login(loginDto);
      return user;
    } catch (err) {
      console.log(err.stack);
      return err;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR)
  async findAll() {
    return this.usersService.findAll();
  }

  @Patch('update-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @UserDec() userDec) {
    try {
      const user: User | null = await this.usersService.findOne(userDec.username);

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'This user does not exist',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const { password: hashedPassword } = user;
      const { oldPassword: plainTextPassword } = updatePasswordDto;
      const isPassMatch = bcrypt.compareSync(plainTextPassword, hashedPassword);

      if (!isPassMatch) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Le mot de passe actuel ne correspond pas',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      // * Si le mot de passe actuel est correct on le changer
      const isUpdated: boolean = await this.usersService.updatePassword(user.id, updatePasswordDto);
      if (!isUpdated) return "Le mot de passe n'a pas été changé";
      return 'Le mot de passe a été changé avec succès';
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  @Delete('delete-me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR)
  async remove(@Param('id') id: string, @UserDec() userDec) {
    try {
      const user: User | null = await this.usersService.deleteOne(userDec.id);
      if (!user) {
        throw new NotFoundException("Can't mark this user as deleted");
      }
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async determinerRole(role: string, token: string, id: string) {
    // const reponse: { [key: string]: any } = { token };
    switch (role) {
      case 'Etudiant':
        const res: any = this.studentService.findOne(id);
        if (!(res instanceof Student)) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `The ${role} associeted to this user does not exist`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        return res;

        break;
      case 'Professor':
        return this.professorService.findById(id);
        break;
      default:
        break;
    }
  }
}

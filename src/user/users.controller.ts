import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login-user.dto';
import { User as UserDec } from './user.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import * as bcrypt from 'bcrypt';
import { TokenInterface } from './dto/token.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto | null | Error> {
    return this.usersService.register(createUserDto);
  }

  @Post('logout/:idUser')
  @UseGuards(JwtAuthGuard)
  logout(@Body() userDto: CreateUserDto) {
    return this.usersService.logout(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ [key: string]: any } | string> {
    try {
      const user: (User & UserDocument) | null = await this.usersService.findOne(loginDto.username);

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
      const { password: plainTextPassword } = loginDto;
      const isPassMatch = bcrypt.compareSync(plainTextPassword, hashedPassword);
      if (!isPassMatch) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Vous avez entré un mauvais mot de passe',
          },
          HttpStatus.FORBIDDEN,
        );
        // return 'Le mot de passe est ne correspond 2';
      }
      const tokenInterface: TokenInterface = {
        username: user.username,
        idOfUser: user.id,
        role: user.role,
        roleUserID: user.idOfRole,
      };
      const token: string = this.jwtService.sign(tokenInterface);

      return { token };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Patch('update-password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @UserDec() userDec) {
    try {
      const user: (User & UserDocument) | null = await this.usersService.findOne(userDec.username);

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
      const { old_password: plainTextPassword } = updatePasswordDto;
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
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @UserDec() userDec) {
    try {
      const user: (User & UserDocument) | null = await this.usersService.deleteOne(userDec.id);
      if (!user) {
        throw new NotFoundException("Can't mark this user as deleted");
      }
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

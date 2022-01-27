import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto | null | Error> {
    return this.usersService.register(createUserDto);
  }

  @Post('logout/:idUser')
  logout(@Body() userDto: CreateUserDto) {
    return this.usersService.logout(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ [key: string]: any } | string> {
    try {
      const user: (User & UserDocument) | null = await this.usersService.findOne(loginDto.username);
      console.log(user);

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
      const token: string = this.jwtService.sign(user.toObject());
      return { token };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user: (User & UserDocument) | null = await this.usersService.deleteOne(id);
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

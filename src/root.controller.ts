import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/schemas/user.schema';

@Controller('root')
export class RootController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async registerRoot(@Body() createUserDto: CreateUserDto): Promise<User | any> {
    try {
      const response = await this.usersService.registerRoot(createUserDto);
      if (response instanceof User) {
        return { message: 'User created', user: response };
      }
      throw new HttpException(response.message, HttpStatus.EXPECTATION_FAILED);
    } catch (error) {
      return error;
    }
    // return 'ok';
  }
  @Post('add-professor')
  registerProfessor(@Body() createUserDto: Partial<CreateUserDto>) {
    // return this.usersService.registerRootProfessor(createUserDto);
  }
}

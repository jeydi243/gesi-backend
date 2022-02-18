import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user/users.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller('root')
export class RootController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  registerRoot(@Body() createUserDto?: CreateUserDto): Promise<CreateUserDto | null | Error> {
    return this.usersService.registerRoot(createUserDto);
  }
  @Post('add-professor')
  registerProfessor(@Body() createUserDto?: CreateUserDto) {
    // return this.usersService.registerRootProfessor(createUserDto);
  }
}

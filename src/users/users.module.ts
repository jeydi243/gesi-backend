import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { MyJwtStrategy } from './myjwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }), JwtModule.register({ secret: 'jeydi243' })],
  controllers: [UsersController],
  providers: [MyJwtStrategy, JwtService, UsersService, JwtModule],
  exports: [MyJwtStrategy, JwtService, UsersService, JwtModule],
})
export class UsersModule {}

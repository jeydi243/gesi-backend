import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { MyJwtStrategy } from './myjwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { MyStrategy } from 'src/config/export.type';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: MyStrategy.MY_JWT_STRATEGY, property: 'user' }), JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [UsersController],
  providers: [MyJwtStrategy, JwtService, UsersService, JwtModule],
  exports: [MyJwtStrategy, JwtService, UsersService, JwtModule],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: process.env.SECRET }),
  ],
  providers: [],
})
export class AuthModule {}

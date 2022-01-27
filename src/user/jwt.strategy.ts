import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload): Promise<User | null> {
    console.log(payload);
    const user = await this.usersService.findOne(payload.username);
    if (!user) {
      console.log('eeee');
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { TokenInterface } from './dto/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenInterface) {
    console.log('The token is : ', payload);
    const user: User & UserDocument = await this.usersService.findOne(payload.username);
    if (!user) {
      console.log('eeee');
      throw new UnauthorizedException();
    }
    const { username, role, idOfRole, id: idOfUser } = user;
    return { username, role, idOfRole, idOfUser };
  }
}

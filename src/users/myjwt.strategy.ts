import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenInterface } from './dto/token.interface';
import { MyStrategy } from 'src/config/export.type';

@Injectable()
export class MyJwtStrategy extends PassportStrategy(Strategy, MyStrategy.MY_JWT_STRATEGY) {
  constructor(private usersService: UsersService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(username: string, password) {
    try {
      console.log({ username }, { password });

      const user: User = await this.usersService.findOne(username);
      if (!user) {
        throw new UnauthorizedException({ message: `User doesn't exist with ${JSON.stringify(password)}` });
      }
      // const { username, role, idOfRole, id: idOfUser } = user;
      return { username /*role, idOfRole, idOfUser*/ };
    } catch (error) {
      console.log({ error });
    }
  }
}

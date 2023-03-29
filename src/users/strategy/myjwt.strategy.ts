import { User } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { TokenInterface } from '../dto/token.interface';
import { MyStrategy } from 'src/config/export.type';

@Injectable()
export class MyJwtStrategy extends PassportStrategy(Strategy, MyStrategy.MY_JWT_STRATEGY) {
  constructor(private usersService: UsersService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
      // passReqToCallback: true,
      // usernameField: 'usernameField',
    });
  }

  async validate(user: any): Promise<any> {
    try {
      // console.log({ user });

      const userFound: User = await this.usersService.findOne(user?.username);
      if (!userFound) {
        throw new UnauthorizedException({ message: `User doesn't exist with username ${user?.username}` });
      }
      // const { username, role, idOfRole, id: idOfUser } = user;
      //c'est ici que l'objet user doit etre ajouter a la requete autrement dit req.user est crée grace a l'objet qu'on renvoie ici
      return user;
    } catch (error) {
      console.log({ error });
      return {};
    }
  }
}

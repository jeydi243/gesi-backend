import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MyJwtStrategy } from '../myjwt.strategy';

// ! Ce guard ajoute un objet user à la requète, lorsqu'il valide le token envoyé dans la requete
// ! par l'entremise du header Authorization

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('JWTGUARD:', { user }, { requiredRoles } /*, { request }*/);

    return true;
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log({ info });

    if (err || !user) {
      throw err || new UnauthorizedException('bandakwe');
    }
    return user;
  }
}

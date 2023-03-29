import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MyStrategy } from 'src/config/export.type';

// ! Ce guard ajoute un objet user à la requète, lorsqu'il valide le token envoyé dans la requete
// ! par l'entremise du header Authorization

@Injectable()
export class JwtAuthGuard extends AuthGuard(MyStrategy.MY_JWT_STRATEGY) {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log('JWTGUARD:', { requiredRoles } /*, { request }*/);

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    // console.log({ err, user, info });

    if (err || !user) {
      throw err || new UnauthorizedException("Can't handle request please verify");
    }
    return user;
  }
}

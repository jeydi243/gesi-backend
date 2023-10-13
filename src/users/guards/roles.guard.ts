import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

// ! Ce guard doit etre executé a la suite de JwtAuthGuard,
// ! car il beneficie de l'object user dans la requete
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // * List des roles permis d'acceder à cette route
    // * Ces roles sont définis dans le decorator @Roles
    const roles: string[] = this.reflector.get<string[]>('roles', context.getClass());
    const req = context.switchToHttp().getRequest();
    const currentUserRole = req.user.role;
    console.log('Current role is : ', currentUserRole);
    if (roles.includes(currentUserRole)) {
      return true;
    }
    throw new UnauthorizedException(`En tant que ${currentUserRole}, vous ne pouvez pas accèder à cette route. \n Permissions acces to: ${roles}`);
  }
}

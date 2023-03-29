import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// ! Ce guard doit etre executé a la suite de JwtAuthGuard,
// ! car il beneficie de l'object user dans la requete
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // * List des roles permis d'acceder à cette route
    // * Ces roles sont définis dans le decorator @Roles
    const requiredRoles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
    // this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    const { user }: any = req;
    const userRoles: string[] = req.user?.roles;

    // console.log('ROLESGUARD: ', { requiredRoles }, { userRoles }, { user: user });

    if (!user) {
      throw new UnauthorizedException({ message: `You are not logged in` });
    } else if (!userRoles || userRoles.length === 0) {
      throw new UnauthorizedException({ message: `You don't have role assigned to call this route` });
    } else if (this.checkCommonRoles(userRoles, requiredRoles)) {
      return true;
    } else throw new UnauthorizedException({ message: `${user.username.toUpperCase()} you don't have access to this route, only ${requiredRoles} have access` });
  }
  checkCommonRoles(arr1: string[], arr2: string[]): boolean {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
          return true;
        }
      }
    }
    return false; // looped through all elements and none are present in arr2
  }
}

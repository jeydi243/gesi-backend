import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


// ! Ce guard ajoute un objet user a la requete, lorsqu'il valide le token envoyé dans la requete 
// ! par l'entremise du header Authorization

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

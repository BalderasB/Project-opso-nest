import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // 👈 esto es importante
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 👈 esto también es necesario

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('Roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.userRoles);
  }

  matchRoles(roles: string[], userRoles: string[]) {
    return userRoles.some(role => roles.includes(role));
  }
}


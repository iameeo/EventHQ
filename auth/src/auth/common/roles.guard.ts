
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable() // 의존성 주입 가능한 서비스
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 생성자 - 의존성 주입

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('[RolesGuard] user =', user);
    return user && requiredRoles.includes(user.role);
  }
}
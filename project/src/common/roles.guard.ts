import { Guard, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

// 角色看守器
@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(req, context: ExecutionContext): boolean {
    const {parent, handler} = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if(!roles) {  // 如果没有设置 用户验证权限，则直接返回 true ，继续完整请求响应过程
      return true;
    }
    if(!req.headers.user) {
      // return false;
      throw new ForbiddenException(); // 不返回 false ，可以使用自己定义的异常过滤器
    }

    // header 里面设置 [{"key":"user","value":"{"name":"a","roles":["admin"]}","description":"","enabled":true}]
    const user = JSON.parse(req.headers.user);
    console.log("[Guard] user")
    const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
    // return user && user.roles && hasRole();
    if(user && user.roles && hasRole()) {
      return true
    } else {
      throw new ForbiddenException();
    }
  }

  // canActivate (dataOrRequest, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   return true;
  // }
}
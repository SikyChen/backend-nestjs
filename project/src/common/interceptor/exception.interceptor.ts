import { Interceptor, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// 拦截器 异常响应
@Interceptor()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(dataRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.catch(err => Observable.throw(
      new HttpException('拦截器返回的异常信息', HttpStatus.BAD_GATEWAY)
    ));
  }
}
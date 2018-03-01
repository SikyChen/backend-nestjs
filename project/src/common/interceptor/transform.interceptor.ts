import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// 拦截器 包装响应数据
@Interceptor()
export class TransformInterceptor implements NestInterceptor {
  intercept(dataRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map(data => ({data}));
  }
}
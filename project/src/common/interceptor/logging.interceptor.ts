import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

// 拦截器 记录响应时间
@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept(dataRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    console.log('[Interceptor] Before...');
    const now = Date.now();

    return stream$.do(
      () => console.log(`[Interceptor] After... ${Date.now() - now}ms`)
    );
  }
}
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

// 标准中间件
@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): ExpressMiddleware {
    return (req, res, next) => {
      console.log(`[${name}] request ${req.method}: ${req.url}`);
      next();
    }
  }
}
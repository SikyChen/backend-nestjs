import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './catsModule/cats.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { CatsController } from './catsModule/cats.controller';
import { Logger2Middleware } from './common/logger2.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  components: []
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {  // 中间件的使用
    consumer.apply(LoggerMiddleware).with('LOGGER').forRoutes(CatsController);  // 中间件会依顺序被调用，如果没有使用 next() ，则程序将被挂起
    consumer.apply(Logger2Middleware).forRoutes(CatsController);  // 当中间件没有任何依赖关系时，我们可以考虑使用功能中间件

    // consumer.apply(LoggerMiddleware).forRoutes(
    //   {path: 'cats', method: RequestMethod.GET},
    //   {path: 'cats', method: RequestMethod.POST}
    // )
  }
}

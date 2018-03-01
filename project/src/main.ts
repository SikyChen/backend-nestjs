import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ExceptionInterceptor } from './common/interceptor/exception.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	// 全局 异常过滤器
	app.useGlobalFilters(new HttpExceptionFilter());
	// 全局 类验证管道
	app.useGlobalPipes(new ValidationPipe());
	// 全局 请求计时拦截器
	app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor(), new ExceptionInterceptor());

	await app.listen(3001);
}
bootstrap();

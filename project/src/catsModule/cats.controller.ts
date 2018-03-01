import { Controller, Get, Param, Post, Req, Body, HttpException, HttpStatus, UseFilters, ForbiddenException, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { MyForbiddenException } from '../common/myForbidden.exception';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TransformInterceptor } from '../common/interceptor/transform.interceptor';
import { ExceptionInterceptor } from '../common/interceptor/exception.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
// @UseFilters(new HttpExceptionFilter) // 控制器范围的 异常过滤器
// @UseInterceptors(LoggingInterceptor, TransformInterceptor, ExceptionInterceptor) // 控制器范围的 拦截器
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @Post()
  @Roles('admin') // 设置用户验证权限 
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('[Controller] post cats');
    this.catsService.create(createCatDto);
    return 'success!';
  }

  @Get()
  async findAll(@Req() request): Promise<Cat[]> {
    // console.log('get cats');
    return this.catsService.findAll();
  }

  @Get('/:id')
  async showId(@Param('id', new ParseIntPipe()) id) {   // ParseIntPipe 变压器管道，将一个字符串解析为一个整数值
    return {id: id, str: 'str'}
  }

  @Get('error')
  async error() {
    throw new ForbiddenException();

    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   msg: '发生已知错误',
    // }, HttpStatus.FORBIDDEN); // 这里跟文档不同，文档中没有加第二个参数
  }

  @Post('errorfilter')
  // @UseFilters(new HttpExceptionFilter())
  async errorfilter() {
    throw new ForbiddenException();
  }
}
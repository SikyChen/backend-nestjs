import { Controller, Get, Post, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { MyForbiddenException } from '../common/myForbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    // console.log('post cats', createCatDto);
    this.catsService.create(createCatDto);
    return 'success!';
  }

  @Get()
  async findAll(@Req() request): Promise<Cat[]> {
    // console.log('get cats');
    return this.catsService.findAll();
  }

  @Get('error')
  async error() {
    return new MyForbiddenException();

    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   msg: '发生已知错误',
    // }, HttpStatus.FORBIDDEN); // 这里跟文档不同，文档中没有加第二个参数
  }
}
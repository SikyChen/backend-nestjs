import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('post cats', createCatDto);
    this.catsService.create(createCatDto);
    return 'success!';
  }

  @Get()
  async findAll(@Req() request): Promise<Cat[]> {
    console.log('get cats');
    return this.catsService.findAll();
  }
}
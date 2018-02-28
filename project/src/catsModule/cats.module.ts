import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global() // 使此模块成为 全局模块
@Module({
  imports: [],
  controllers: [CatsController],
  components:[CatsService],
  exports: [CatsService]  // 每个导入 CatsModule 的模块 (将 CatsModule放入模块数组) 都可以访问 CatsService，并将与导入该模块的所有模块共享相同的实例；可以导出 组件，模块，但不能导出 控制器
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {} // 模块可以注入属于它的组件（例如，为了配置目的）；但是，模块类不能由组件注入
}
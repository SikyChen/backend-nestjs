import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './catsModule/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  components: []
})
export class ApplicationModule {}

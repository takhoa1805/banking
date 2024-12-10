import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from './decorators/public-route.decorator';

@Controller()
@ApiTags('Default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicRoute()
  @Get()
  async getHello() {
    // console.log(new Date(Date.now()));
    return this.appService.getHello();
  }
}

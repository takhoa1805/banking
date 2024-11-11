import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { Role } from './constants/role.constant';

@Controller()
@ApiTags('Default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(Role.USER)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

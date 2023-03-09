import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('goodbye')
  sayGoodbye() {
    return this.appService.sayGoodbye();
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello Folks';
  }

  sayGoodbye() {
    return 'Goodbye Folks';
  }

}


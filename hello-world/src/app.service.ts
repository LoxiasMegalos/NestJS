import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }

  getCumprimento(): string{
    return 'Opa blz?'
  }

}

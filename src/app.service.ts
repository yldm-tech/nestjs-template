import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(header: string): string {
    return `Hello World! ${header}`;
  }
}

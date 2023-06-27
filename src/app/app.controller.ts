import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';

@Controller()
@ApiBearerAuth('Authorization')
@ApiSecurity('AccessToken')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  getHello(@Req() req, customHeader: string): string {
    console.log(req.headers);
    return this.appService.getHello(customHeader);
  }
}

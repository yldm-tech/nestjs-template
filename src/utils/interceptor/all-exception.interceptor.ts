import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof NotFoundException) {
      return response.status(404).json({
        success: false,
        code: 404,
        data: null,
        msg: exception.message,
      });
    } else if (exception instanceof UnauthorizedException) {
      return response.status(401).json({
        code: 401,
        success: false,
        data: null,
        msg: exception.message,
      });
    } else {
      this.logger.error(exception.stack);
      return response.status(500).json({
        code: 500,
        success: false,
        data: null,
        msg: exception.message,
      });
    }
  }
}

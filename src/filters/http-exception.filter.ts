import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();


    response.status(status).json({
      statusCode: status,
      statusName: exception.name,
      message: exception.message,
      path: request.url,
    });
  }
}

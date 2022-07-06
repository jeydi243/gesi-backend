import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status: number | null = exception.getStatus() || 200;
    console.log(exception.getResponse());

    response.status(status).json({
      statusCode: status,
      statusName: exception.name,
      // timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}

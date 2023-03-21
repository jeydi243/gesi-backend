import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(InternalServerErrorException)
export class OtherException implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    const message = exception.getResponse()['message'];
    response.status(500).json({
      statusName: exception.name,
      path: request.url,
      message: message,
    });
  }
}

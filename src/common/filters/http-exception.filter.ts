import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).send({
      message: typeof exceptionResponse === 'object' 
        ? (exceptionResponse as any).message || 'An error occurred'
        : exceptionResponse,
      statusCode: status,
      data: null
    });
  }
} 
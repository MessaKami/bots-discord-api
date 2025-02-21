import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { FastifyReply } from 'fastify';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();

    const validationErrors = exception.getResponse() as { message: ValidationError[] };

    response.status(status).send({
      statusCode: status,
      message: 'Validation failed',
      errors: validationErrors.message,
      data: null
    });
  }
} 
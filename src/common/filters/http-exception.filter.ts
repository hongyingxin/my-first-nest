import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ResourceNotFoundException } from 'src/exceptions';

@Catch(ResourceNotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      error: response.error,
    });
  }
}
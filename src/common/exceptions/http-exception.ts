import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { LoggerRequestsService } from '../../logger-requests/logger-requests.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerRequestsService: LoggerRequestsService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { status, json } = this.prepareException(exception);
    response.status(status).send(json);

    this.loggerRequestsService.log({
      endpoint: request.url,
      method: request.method,
      body: request.body,
      query: request.query,
      isError: true,
    });
  }

  prepareException(exc: any): { status: number; json: object } {
    const error =
      exc instanceof HttpException
        ? exc
        : new InternalServerErrorException(exc.message);

    const status = error.getStatus();
    const response = error.getResponse();
    const json = typeof response === 'string' ? { error: response } : response;

    return { status, json };
  }
}

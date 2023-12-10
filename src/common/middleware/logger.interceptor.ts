import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerRequestsService } from '../../logger-requests/logger-requests.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerRequestsService: LoggerRequestsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.loggerRequestsService.log({
          endpoint: request.url,
          method: request.method,
          body: request.body,
          query: request.query,
          time: `${Date.now() - now}`,
        });
      }),
    );
  }
}

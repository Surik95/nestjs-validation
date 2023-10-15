import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'success',
          data,
        };
      }),
      catchError((err) => {
        return of({
          status: 'fail',
          data: err.message,
        });
      }),
    );
  }
}

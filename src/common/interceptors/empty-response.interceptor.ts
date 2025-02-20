import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // Si la donnée est null ou undefined
        if (data === null || data === undefined) {
          return {
            message: 'No data found',
            data: null,
            statusCode: 200
          };
        }
        
        // Si c'est un tableau vide
        if (Array.isArray(data) && data.length === 0) {
          return {
            message: 'No data found',
            data: [],
            statusCode: 200
          };
        }

        // Si c'est un objet vide
        if (typeof data === 'object' && Object.keys(data).length === 0) {
          return {
            message: 'No data found',
            data: {},
            statusCode: 200
          };
        }

        // Si c'est une réponse normale avec des données
        return {
          message: 'Data retrieved successfully',
          data: data,
          statusCode: 200
        };
      }),
    );
  }
} 
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpCustomInteceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((r: any) => {
        console.log('aca');
        if (r instanceof HttpRequest) {
          // Agregar los header o modificar la peticion          
          const re = '/Authentication/Login';
          const token: string = localStorage.getItem('token');
          if (r.url.search(re) === -1) {
            r = r.clone({
              setHeaders: {
                authorization: `Bearer ${token}`,
              },
            });            
          } 
          return r;             
        }

        if (r instanceof HttpResponse) {
          const tBody = r.body;
          if ('data' in tBody) {
            r = r.clone<any>({ body: tBody.data });
          }
          return r;
        }
      })
    );
  }
}

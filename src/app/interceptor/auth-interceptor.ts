import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = '/Authentication/Login';    
    const token: string = localStorage.getItem('token');

    let request = req;    
      if (req.url.search(re) === -1) {
        request = req.clone({
          setHeaders: {                    
            authorization: `Bearer ${ token }`
          }
        });
      }
      return next.handle(request);
  }
}

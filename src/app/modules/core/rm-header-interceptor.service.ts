import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmHeaderInterceptorService  implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

      const modifiedRequest: HttpRequest<any> =  request.clone({
        setHeaders: {'Content-Type' : 'application/x-www-form-urlencoded' }
      });

        if (request.method === 'GET') {
          console.log(`returning non modified url for get request ${request.url}`);
          return next.handle(request);
        } else {
            console.log(`Returnning Modified Post header ${request.url}`);
          return next.handle(modifiedRequest);
        }
    }

}

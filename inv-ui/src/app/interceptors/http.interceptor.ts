import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  requestCount = 0;
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestCount++;
    if (!(request.url.endsWith('login') || request.url.endsWith('signup'))) {
      // this.loaderService.show();
      // this.spinner.show();
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        )
      });
    }
    // return next.handle(request);

    return next.handle(request).pipe(
      tap(
        event => console.log(event),

        error => console.log(error)
      ),
      finalize(() => {
        this.requestCount--;
        // if (this.requestCount == 0) this.spinner.hide();
      })
    );
  }
}

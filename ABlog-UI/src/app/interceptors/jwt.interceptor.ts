import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
class JwtInterceptorService{

  constructor(
    private accountService: AccountService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    //Get current user
    const currentUser = this.accountService.currentUserValue;
    const isApiUrl = request.url.startsWith(environment.webApi);
    
    //Set all http request headers with authorization and bearer token
    if (this.accountService.isLoggedIn() && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      })
    }

    return next(request);
  }
}

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return inject(JwtInterceptorService).intercept(req, next);
};

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { AuthService } from '@shared/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { routes } from '@shared/routes/routes';
import { Loading } from 'notiflix';
import { sweet } from '@shared/utils/sweet.util';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
   
    if (token) {
      if (!request.url.includes(routes.login) && !request.url.includes(routes.register)) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      // return next.handle(request);
    }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
            sweet.fire("Error!","Error de conexión", "error");
            break;
          case 500:
            sweet.fire("Error!",error.error.message, "error");
            break;
            case 401:
              this.authService.logout();
              this.router.navigate([routes.login]);
            break;
          default:
            sweet.fire("Error!", error.error.message, "error");
            break;
        }
        Loading.remove();
        return throwError(()=>error);
      })
    );
  }
}

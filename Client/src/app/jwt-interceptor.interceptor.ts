import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "./auth/store/reducers";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    /*private store: Store<fromAuth.State>*/ private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authService.userData.getValue();
    console.log("interceptor", currentUser);
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}

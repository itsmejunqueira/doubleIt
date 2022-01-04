import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let authModel = this.authenticationService.getAuthFromLocalStorage();
        if (authModel && authModel.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authModel.token}`
                }
            });
        }

        return next.handle(request);
    }
}
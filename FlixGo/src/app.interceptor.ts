import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',

        });
        
        if (req.url.startsWith('/api')) {
            request = req.clone({
                headers,
                url: req.url.replace('/api', 'http://localhost:3030/api'),
            });
        }

        return next.handle(request).pipe(
            catchError((err) => throwError(() => {
                return err.error;
            })))
    }
}

export const AppInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
}
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from
    "@angular/common/http";
import {Observable} from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    //Request kopieren
    request = request.clone({
      //Header setzen, Authorization Header, von Session Storage Token
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    //Observable, schicken es weiter
    return next.handle(request);
  }
}

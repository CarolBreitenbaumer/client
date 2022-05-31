import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private toastr:ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //möchten von Request die Response, asyncron daher zusammenhängen,
    // tap = um Zugriff auf außen zu ermöglichen
    return next.handle(req).pipe(tap((event:HttpEvent<any>)=>{
      //ist Event Instanz von normalen http Response, dann macht man nichts
      if(event instanceof HttpResponse){
      }
    }, (err:any)=>{
      if(err instanceof HttpErrorResponse){
        //Fehler
        if(err.status ===401){
          this.toastr.error("Incorrect credentials","Login error");
        }
      }
    }));
  }
}

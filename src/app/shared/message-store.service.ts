import { Injectable } from '@angular/core';
import {Appointment, Subject} from "./subject";
import {HttpClient} from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';
import {Message} from "./message";

@Injectable()

export class MessageStoreService {
  private api = 'http://tutor.s1710456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {  }

  create(message: Message): Observable<any> {
    return this.http.post(`${this.api}/messages`, message)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getmessageForStudent(student_id: number){
    return this.http.get(`${this.api}/messages/forStudent/${student_id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getmessageForTutor(tutor_id: number){
    return this.http.get(`${this.api}/messages/forTutor/${tutor_id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  setMessageReaded(id: number){
    return this.http.post(`${this.api}/messages/readMessage/${id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}

import { Injectable } from '@angular/core';
import {Appointment, Subject} from "./subject";
import {HttpClient} from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';

@Injectable()

export class SubjectStoreService {
  private api = 'http://tutor.s1710456003.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {  }

  getAll():Observable<Array<Subject>>{
    return this.http.get<Subject>(`${this.api}/subjects`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/byId/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  getSingleByName(name: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/byName/${name}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(subject: Subject): Observable<any> {
    return this.http.post(`${this.api}/subjects`, subject)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(subject: Subject): Observable<any> {
    return this.http.put(`${this.api}/subjects/${subject.id}`, subject)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Subject>> {
    return this.http.get<Subject>(`${this.api}/subjects/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  setBooking(user_id: number){
    return this.http.post(`${this.api}/user/setBooking/${user_id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  check(name: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.api}/subjects/checkName/${name}`)
      .pipe(catchError(this.errorHandler));
  }

  // --------Apointments ------------
  index(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.api}/appointments/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  registerUserAppointment(appointment_id: number, student_id: number): Observable<any>{
    return this.http.post(`${this.api}/user/registerAppointment/${appointment_id}/${student_id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getBookedAppointmentsPast(id: number){
    return this.http.get(`${this.api}/appointments/getBookedAppointmentsPast/${id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getBookedAppointmentsFuture(id: number){
    return this.http.get(`${this.api}/appointments/getBookedAppointmentsFuture/${id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getBookedAppointmentsPastForStudent(id: number){
    return this.http.get(`${this.api}/appointments/getBookedAppointmentsPastForStudent/${id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getBookedAppointmentsFutureForStudent(id: number){
    return this.http.get(`${this.api}/appointments/getBookedAppointmentsFutureForStudent/${id}`,{})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Subject} from "../shared/subject";
import {Appointment} from "../shared/appointment";
import {SubjectStoreService} from "../shared/subject-store.service";
import {AuthenticationService} from "../shared/authentication.service";
import {Message} from "../shared/message";
import {MessageStoreService} from "../shared/message-store.service";

@Component({
  selector: 'bs-subject-list',
  templateUrl: './subject-list.component.html',
  styles: [
  ]
})
export class SubjectListComponent implements OnInit {

  subjects: Subject[] | undefined = undefined;
  message : Message [] = [];
  appointmentFuture: Appointment[] = [];
  appointmentPast: Appointment[] = [];
  appointmentFutureForStudent: Appointment[] = [];
  appointmentPastForStudent: Appointment[] = [];

  constructor(private bs: SubjectStoreService,
              public authService: AuthenticationService,
              public messageService: MessageStoreService,
              ) {}

  ngOnInit(){
    this.bs.getAll().subscribe(res => this.subjects = res);
    if(this.authService.IsLoggedAndAdmin()){
      this.getBookedAppointmentsFuture();
      this.getBookedAppointmentsPast();
      this.getMessagesForTutor();
    }
    if(this.authService.IsLoggedAndNoAdmin()){
      this.getBookedAppointmentsFutureForStudent();
      this.getBookedAppointmentsPastForStudent();
    }
  }

  getMessagesForTutor(){
    this.messageService.getmessageForTutor(this.authService.getCurrentUserId())
      .subscribe(b => this.message = b);
  }

  getBookedAppointmentsFuture(): void{
    this.bs.getBookedAppointmentsFuture(this.authService.getCurrentUserId()).subscribe(res => this.appointmentFuture = res);
  }

  getBookedAppointmentsPast(): void{
    this.bs.getBookedAppointmentsPast(this.authService.getCurrentUserId()).subscribe(res => this.appointmentPast = res);
  }

  getBookedAppointmentsFutureForStudent(): void{
    this.bs.getBookedAppointmentsFutureForStudent(this.authService.getCurrentUserId()).subscribe(res => this.appointmentFutureForStudent = res);
  }

  getBookedAppointmentsPastForStudent(): void{
    this.bs.getBookedAppointmentsPastForStudent(this.authService.getCurrentUserId()).subscribe(res => this.appointmentPastForStudent = res);
  }

  setMessageReaded(id:number){
    this.messageService.setMessageReaded(id).subscribe();
  }

}

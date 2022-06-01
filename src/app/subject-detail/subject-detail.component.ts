import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Appointment, Subject} from "../shared/subject";
import {SubjectFactory} from "../shared/subject-factory";
import {SubjectStoreService} from "../shared/subject-store.service";
import {ToastrService} from "ngx-toastr";
import {formatDate} from "@angular/common";


@Component({
  selector: 'bs-subject-detail',
  templateUrl: './subject-detail.component.html',
  styles: [
  ]
})
export class SubjectDetailComponent implements OnInit {

  subject: Subject =SubjectFactory.empty();
  freeAppointments: Appointment[] = [];

  constructor(public authService: AuthenticationService,
              private bs: SubjectStoreService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      const params = this.route.snapshot.params;
      this.bs.getSingleByName(params['name'])
        //holen Fach und dann die Appointments
        .subscribe((b) => { this.subject = b; this.getfreeAppointments(); console.log("Appointments",this.freeAppointments)});

  }

  removeSubject() {
    this.toastr.success("Das Fach " + this.subject.name + " wurde erfolgreich gelöscht.");
    if (confirm('Möchtest du das Fach wirklich löschen?')) {
      this.bs.remove(this.subject.id)
        .subscribe(res => this.router.navigate(['../'], {
            relativeTo:this.route

          }
        ));
    }
  }

  setBooking(appointment_id: number){
    this.bs.setBooking(appointment_id).subscribe(b => {
      window.location.reload();
    });
  }


  setButtonToAttend(date: Date, appointTime: string): boolean {
    date = new Date(formatDate(date, 'yyyy-MM-dd', 'en'));
    const timeElemts: string[] = appointTime.split(':');
    date.setHours(Number(timeElemts[0]), Number(timeElemts[1]));

    const time = new Date(formatDate(new Date(), 'yyyy-MM-dd', 'en'));

    if(date.toISOString() < time.toISOString()){
      return false;
    }

    time.setHours(time.getHours() + 24);

    if(date.toISOString() <= time.toISOString()) {
      return true;
    }

    return false;
  }

  registerAppointment(appointment_id: number):void{
    this.bs.registerUserAppointment(appointment_id, this.authService.getCurrentUserId()).subscribe(b=>{
      alert("Erfolgreich durchgeführt.");
      this.ngOnInit();
    },()=>{
      alert("Konnte nicht durchgeführt werden.");
    });
  }

  getfreeAppointments(): void{
    if(this.authService.IsLoggedAndAdmin()){
      this.freeAppointments = this.subject.appointments;
    }else{
      console.log(this.subject.appointments);
    this.freeAppointments = this.subject.appointments.filter(item => item.student_id == null);
    }
  }

}

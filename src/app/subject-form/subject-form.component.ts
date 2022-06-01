import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectFactory} from "../shared/subject-factory";
import {SubjectStoreService} from "../shared/subject-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Appointment, Subject} from "../shared/subject";
import {SubjectFormErrorMessages} from "./subject-form-error-messages";
import {SubjectValidators} from "../shared/subject-validators";
import {formatDate} from "@angular/common";

@Component({
  selector: 'bs-subject-form',
  templateUrl: './subject-form.component.html',
  styles: [
  ]
})
export class SubjectFormComponent implements OnInit {

  subjectForm: FormGroup;
  subject = SubjectFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingSubject = false;
  oldAppointments: Appointment[] = [];
  appointments: FormArray;

  constructor(
    private fb: FormBuilder,
    private bs: SubjectStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subjectForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    //update subject
    if (id) {
      this.isUpdatingSubject = true;

      this.bs.getSingleById(id).subscribe(subject => {
        this.subject = subject;
        this.initSubject();
      })
    }
    //this.initSubject();

  }

  initSubject() {
    this.buildThumbnailsArray();
    //const id = this.route.snapshot.params["id"];
    this.subjectForm = this.fb.group({
      id: this.subject.id,
      name: [this.subject.name, [Validators.required], this.isUpdatingSubject?null:SubjectValidators.nameExists(this.bs)],
      description: [this.subject.description, Validators.required],
      tutor_id: this.subject.tutor_id,
      appointments: this.appointments
    });
    this.subjectForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
    console.log(this.subjectForm);
    console.log(this.subjectForm);
  }

  //für Appointements die gespeichert sind
  buildThumbnailsArray() {
    if (this.subject.appointments) {
      this.appointments = this.fb.array([]);
      console.log(this.appointments);
      for (let app of this.subject.appointments) {
      this.pushFormArrayForAppointment(app.id, app.date, app.time, app.place, app.attend, app.student_id);
      }
    }
    console.log(this.subject.appointments);

  }

  pushFormArrayForAppointment(id: number, date: Date, time: string, place: string, attend:boolean, student_id:number ){
    console.log ("Student ID:" + student_id);

    if(student_id != null){
      this.oldAppointments.push();
      return;
    }
    let fg = this.fb.group({
      id: new FormControl(id),
      date: new FormControl(formatDate(date, 'yyyy-MM-dd', 'en'), [Validators.required]),
      time: new FormControl(time, [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0][0]$')]),
      duration: new FormControl(1),
      attend: new FormControl(attend),
      place: new FormControl(place, [Validators.required])
    }, {validator: this.checkForDateInPast});
    this.appointments.push(fg);
  }

  // für die Appointements die der Benutzer erstellt
  addThumbnailControl() {
    this.pushFormArrayForAppointment(0, new Date(),"16:00","online, MS Teams", false, 0);
  }

  checkForDateInPast(g: FormGroup){
    if(g.controls['id'].value != 0) {
      return;
    }
    const today: Date = new Date();

    if (new Date(g.controls['date'].value).toISOString() < today.toISOString())
      return { "InTheFuture": false };

    return;
  }


  submitForm() {
    // filter empty values
    console.log(this.subjectForm.controls['appointments']);
    this.subjectForm.value.appointments = this.subjectForm.value.appointments.filter(
      (thumbnail: { name: string; }) => thumbnail.name
    );
    const subject: Subject = SubjectFactory.fromObject(this.subjectForm.value, this.subjectForm.controls['appointments'].value, this.oldAppointments);

    console.log(subject);
    if(subject.appointments.length == 0){
      alert("Bitte geben sie mindestens einen Termin an.");
      return;
    }
    //update
    if (this.isUpdatingSubject) {
      this.bs.update(subject).subscribe(res => {
        this.router.navigate(["../../subjects", subject.name], {
          relativeTo: this.route
        });
      });
    } else {
      subject.tutor_id = 1; // just for testing

      //create
      this.bs.create(subject).subscribe(res => {
        this.subject = SubjectFactory.empty();
        this.subjectForm.reset(SubjectFactory.empty());
        this.router.navigate(["../subjects"], { relativeTo: this.route });
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.subjectForm.invalid);
    console.log(this.subjectForm);
    this.errors = {};
    for (const message of SubjectFormErrorMessages) {
      const control = this.subjectForm.controls['appointments'].get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
        console.log(this.errors);
      }
    }
  }

}



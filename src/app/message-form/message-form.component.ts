import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import {MessageFormErrorMessages} from "./message-form-error-messages";
import {MessageFactory} from "../shared/message-factory";
import {MessageStoreService} from "../shared/message-store.service";
import {Message} from "../shared/message";
import {AuthenticationService} from "../shared/authentication.service";
import {Subject} from "../shared/subject";
import {SubjectFactory} from "../shared/subject-factory";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-message-form',
  templateUrl: './message-form.component.html',
  styles: []
})
export class MessageFormComponent implements OnInit {

  @Input() subject: Subject = SubjectFactory.empty();

  messageForm: FormGroup;
  message = MessageFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private bs: MessageStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private autheticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.messageForm = this.fb.group({});
  }


  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.initMessage();

  }

  initMessage() {
    //const id = this.route.snapshot.params["id"];
    this.messageForm = this.fb.group({
      id: this.message.id,
      comment: [this.message.message, [Validators.required]],
      subject_id: [this.subject.id],
      readed: [this.message.readed],
      student_id: [this.autheticationService.getCurrentUserId()]
    })

    this.messageForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
    console.log(this.messageForm);
  }

  submitForm() {

    const message: Message = MessageFactory.fromObject(this.messageForm.value);

    message.student_id = 1; // just for testing
    console.log(message);

    //create
    this.bs.create(message).subscribe(res => {
      this.message = MessageFactory.empty();
      this.messageForm.reset(MessageFactory.empty());
      this.router.navigate(["../subjects"], {relativeTo: this.route});
      this.toastr.success("Die Nachricht wurde versendet.");
    });
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.messageForm.invalid);
    this.errors = {};
    for (const message of MessageFormErrorMessages) {
      const control = this.messageForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }


}



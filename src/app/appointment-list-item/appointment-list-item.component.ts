import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "../shared/appointment";


@Component({
  selector: 'bs-appointment-list-item',
  templateUrl: './appointment-list-item.component.html',
  styles: [
  ]
})
export class AppointmentListItemComponent implements OnInit {

  constructor() { }

  @Input() appointment: Appointment | undefined

  ngOnInit(): void {
  }

}

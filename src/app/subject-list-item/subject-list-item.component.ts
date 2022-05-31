import { Component, OnInit, Input } from '@angular/core';
import {Subject} from "../shared/subject";


@Component({
  selector: 'a.bs-subject-list-item',
  templateUrl: './subject-list-item.component.html',
  styles: [
  ]
})
export class SubjectListItemComponent implements OnInit {


  @Input() subject: Subject | undefined

  constructor() { }

  ngOnInit(): void {


  }

}

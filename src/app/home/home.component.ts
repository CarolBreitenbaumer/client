import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../shared/subject";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./style.css'
  ]
})
export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  subjectSelected(subject: Subject) {
    this.router.navigate(['../subjects', subject.name], { relativeTo: this.route
    });
  }

}

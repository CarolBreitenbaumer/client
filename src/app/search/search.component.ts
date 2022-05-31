import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {Subject} from "../shared/subject";
import {SubjectStoreService} from "../shared/subject-store.service";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  keyup = new EventEmitter<string>();
  foundSubjects : Subject[] = [];
  isLoading = false;
  @Output() subjectSelected = new EventEmitter<Subject>();

  constructor(private bs : SubjectStoreService) {
  }

  ngOnInit(): void {
    this.keyup.pipe(filter(term => term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=>this.isLoading = true))
      .pipe(switchMap(searchTerm =>this.bs.getAllSearch(searchTerm)))
      .pipe(tap(()=>this.isLoading = false))
      .subscribe((subjects)=>{
        this.foundSubjects = subjects;
      });
  }

}

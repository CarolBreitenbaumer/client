import {SubjectStoreService} from "./subject-store.service";
import {FormControl, FormArray} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export class SubjectValidators {

  static nameExists(bs:SubjectStoreService){
    return function(control: FormControl) {
      return bs.check(control.value)
        .pipe(map(exists => !exists ? null : {nameExists: {valid: false}}));

    }

  }
}

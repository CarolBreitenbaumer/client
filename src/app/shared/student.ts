import {Timestamp} from "rxjs";


export class Student {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public users_id: number,
  ) {
  }
}

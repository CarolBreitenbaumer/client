import {Time} from "@angular/common";
import {Student} from "./student";
import {Subject} from "./subject";

export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public time: string,
    public duration: string,
    public place: string,
    public attend: boolean,
    public student_id: number,
    public subject_id: number,
    public student: Student,
    public subject: Subject
    ) {
  }
}

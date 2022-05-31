import {Subject} from "./subject";

export class Message {
  constructor(
    public id: number,
    public message: string,
    public student_id: number,
    public subject_id: number,
    public subject?: Subject
    ) {
  }
}

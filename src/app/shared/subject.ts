import {Appointment} from "./appointment";
import {Tutor} from "./tutor";
export {Appointment} from "./appointment";


export class Subject {

  constructor(
    public id: number,
    public description: string,
    public name: string,
    public tutor_id: number,
    public appointments: Appointment[],
    public tutor?: Tutor
  ) {
  }
}

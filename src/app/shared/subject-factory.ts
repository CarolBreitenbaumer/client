import {Appointment, Subject} from "./subject";


export class SubjectFactory {

  // erzeugen leeres Subject
static empty():Subject {
  return new Subject(0, '', '', 0, []);
}

// bekommen JSON Objekt mit Datentyp any,
// wollen dann ein typisiertes Subject Objekt zurück haben
static fromObject(rawSubject: any, rawAppointments: any, rawAppointmentsOld: any):Subject{
  //cast vom JSON Objekt das von Rest kommt zu Subject Domain Object
  console.log(rawSubject);
  return new Subject(
    rawSubject.id,
    rawSubject.description,
    rawSubject.name,
    rawSubject.tutor_id,
    this.mearchAppointmentArrays(rawAppointments, rawAppointmentsOld)
  );
}

static mearchAppointmentArrays(rawSubject: any, rawAppointments: any): Appointment[]{
  console.log("MERCH !", rawSubject, rawAppointments)
  const add: Appointment [] = [];
  rawSubject.forEach((value:Appointment)=>{
    add.push(value);
  });
  rawAppointments.forEach((value:Appointment)=>{
    add.push(value);
  });
  return add;
}


}

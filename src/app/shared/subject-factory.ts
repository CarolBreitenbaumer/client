import {Subject} from "./subject";


export class SubjectFactory {

  // erzeugen leeres Subject
static empty():Subject {
  return new Subject(0, '', '', 0, []);
}

// bekommen JSON Objekt mit Datentyp any,
// wollen dann ein typisiertes Subject Objekt zurück haben
static fromObject(rawSubject: any, rawAppointments: any):Subject{
  //cast vom JSON Objekt das von Rest kommt zu Subject Domain Object
  console.log(rawSubject);
  return new Subject(
    rawSubject.id,
    rawSubject.description,
    rawSubject.name,
    rawSubject.tutor_id,
    rawAppointments,
  );
}


}

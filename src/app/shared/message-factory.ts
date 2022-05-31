import {Message} from "./message";


export class MessageFactory {

  // erzeugen leeres Subject
static empty():Message {
  return new Message(0, '', 0, 0);
}

// bekommen JSON Objekt mit Datentyp any,
// wollen dann ein typisiertes Subject Objekt zurück haben
static fromObject(rawSubject: any):Message{
  //cast vom JSON Objekt das von Rest kommt zu Subject Domain Object
  return new Message(
    rawSubject.id,
    rawSubject.comment,
    rawSubject.student_id,
    rawSubject.subject_id
  );
}


}

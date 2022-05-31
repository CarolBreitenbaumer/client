export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const SubjectFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Ein Fach muss angegeben werden.'),
  new ErrorMessage("name", "nameExists", "Das Fach existiert bereits"),
  new ErrorMessage('description', 'required', 'Es muss eine Beschreibung angegeben werden.'),
  new ErrorMessage('appointments', 'required', 'Es muss ein Termin angegeben werden.'),
  new ErrorMessage('time', 'required', 'Es muss eine Uhrzeit angegeben werden.'),
  new ErrorMessage('place', 'required', 'Es muss ein Ort angegeben werden.'),
  new ErrorMessage('date', 'required', 'Impfdatum ist ein Pflichtfeld.'),

];

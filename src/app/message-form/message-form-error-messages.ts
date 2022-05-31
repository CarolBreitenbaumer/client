export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const MessageFormErrorMessages = [
  new ErrorMessage('comment', 'required', 'Es muss eine Nachricht eingeben werden.'),
];

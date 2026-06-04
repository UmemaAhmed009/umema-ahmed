export class ChatMessage {
  constructor(
    public id: string,
    public userId: string,
    public question: string,
    public answer: string,
    public tokens: number,
    public createdAt: Date
  ) {}
}
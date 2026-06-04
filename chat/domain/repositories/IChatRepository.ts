import { ChatMessage } from "../entities/ChatMessage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IChatRepository {

  save(
    message: ChatMessage
  ): Promise<void>;

  findByUserId(
    userId: string
  ): Promise<ChatMessage[]>;
}
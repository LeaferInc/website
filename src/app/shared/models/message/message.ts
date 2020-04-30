import { User } from '../user/user';

export class CreateMessage {
  message_content: string;
  receiverId: number;
}

export class Message {
  id: number;
  createdAt: Date;
  enabled;
  message_content: string;
  sender: User;
  receiver: User;
}

import { User } from '../user/user';
import { Room } from '../room/room';

export class CreateMessage {
  message_content: string;
  roomId: number;
}

export class Message {
  id: number;
  createdAt: Date;
  enabled;
  message_content: string;
  room: Room;
  user: User;
}

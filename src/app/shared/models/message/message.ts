import { User } from '../user/user';
import { Room } from '../room/room';

export class CreateMessage {
  messageContent: string;
  roomId: number;
}

export class Message {
  id: number;
  createdAt: Date;
  enabled;
  messageContent: string;
  room: Room;
  user: User;
}

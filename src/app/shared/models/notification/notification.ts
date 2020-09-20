import { User } from '../user/user';

export class Notification {
  id: number;
  enabled: boolean;
  createdAt: string | Date;
  content: string;
  href: string;
  notifier: User;
  read: boolean;
}

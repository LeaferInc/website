import { User } from '../user/user';

export interface UserAuth {
  user: User;
  token: string;
}
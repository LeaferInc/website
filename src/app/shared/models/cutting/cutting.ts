import { User } from '../user/user';

export class Cutting {
  createdAt: string;
  enabled: boolean;
  id: number;
  name: string;
  description: string;
  ownerId: number;
  views_count: number;
  tradeWith: string;
  owner: User
}

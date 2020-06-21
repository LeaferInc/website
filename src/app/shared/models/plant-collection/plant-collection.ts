import { User } from '../user/user';
import { Plant } from '../plant/plant';

export class PlantCollection {
  id: number;
  createdAt: Date;
  enabled: boolean;
  user: User;
  plant: Plant;
}

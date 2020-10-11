import { User } from '../user/user';
import { Plant } from '../plant/plant';
import { Sensor } from '../sensor/sensor';

export class PlantCollection {
  id: number;
  createdAt: Date;
  enabled: boolean;
  user: User;
  plant: Plant;
  sensor: Sensor;
}

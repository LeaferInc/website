import { PlantCollection } from '../plant-collection/plant-collection';
import { SensorData } from '../sensor-data/sensor-data';

export interface Sensor {
  id: number;
  createdAt: Date;
  enabled: boolean
  plantCollection: PlantCollection;
  plantCollectionId: number;
  sensorDate: SensorData;
}
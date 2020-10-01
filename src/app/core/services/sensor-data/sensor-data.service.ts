import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SensorData } from 'src/app/shared/models/sensor-data/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  static readonly SENSOR_DATA_URL = 'sensor-data';

  constructor(private httpClient: HttpClient) { }

  public getAllDataByUser() {
    return this.httpClient.get<SensorData[]>(`${SensorDataService.SENSOR_DATA_URL}/allByUser`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sensor } from 'src/app/shared/models/sensor/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  static readonly SENSOR_URL = 'sensor';
  
  constructor(private httpClient: HttpClient) { }

  public desync(sensorId: number) {
    return this.httpClient.put<Sensor>(`${SensorService.SENSOR_URL}/desync/${sensorId}`, {});
  }
}
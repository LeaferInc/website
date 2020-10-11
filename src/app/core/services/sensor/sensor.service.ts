import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  static readonly SENSOR_URL = 'sensor';
  
  constructor(private httpClient: HttpClient) { }

  public desync(sensorId: number) {
    return this.httpClient.put(`${SensorService.SENSOR_URL}/desync/${sensorId}`, {});
  }
}
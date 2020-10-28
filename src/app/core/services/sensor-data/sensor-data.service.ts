import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import formatISO from 'date-fns/formatISO';
import { CustomEncoder } from 'src/app/shared/custom-encoder';
import { SensorData } from 'src/app/shared/models/sensor-data/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  static readonly SENSOR_DATA_URL = 'sensor-data';

  constructor(private httpClient: HttpClient) { }

  public getAllDataByUser(start?: Date, end?: Date) {
    let httpParams = new HttpParams({encoder: new CustomEncoder()});
    if(start) httpParams = httpParams.append('start', formatISO(start));
    if(end) httpParams = httpParams.append('end', formatISO(end));
    return this.httpClient.get<SensorData[]>(`${SensorDataService.SENSOR_DATA_URL}/allByUser`, {
      params: httpParams
    });
  }
}

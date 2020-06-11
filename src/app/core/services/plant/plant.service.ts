import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plant } from 'src/app/shared/models/plant/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  static readonly PLANT_URL = 'plant';

  constructor(private http: HttpClient) { }

  public createPlant(plant: Plant) {
    return this.http.post<Plant>(PlantService.PLANT_URL, plant);
  }
}

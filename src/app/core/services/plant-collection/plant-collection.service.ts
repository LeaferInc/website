import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantCollection } from 'src/app/shared/models/plant-collection/plant-collection';

@Injectable({
  providedIn: 'root',
})
export class PlantCollectionService {
  static readonly PLANT_COLLECTION_URL = 'plant-collection';

  constructor(private http: HttpClient) {}

  public create(plantId: number): Observable<PlantCollection> {
    return this.http.post<PlantCollection>(PlantCollectionService.PLANT_COLLECTION_URL, { plantId });
  }

  public findByPlantAndUser(plantId: number): Observable<PlantCollection> {
    return this.http.get<PlantCollection>(
      `${PlantCollectionService.PLANT_COLLECTION_URL}/findByPlantAndUser`,
      {
        params: {
          id: String(plantId)
        }
      }
    );
  }

  public deleteByPlantId(plantId: number) {
    return this.http.delete(`${PlantCollectionService.PLANT_COLLECTION_URL}/${plantId}`);
  }
}

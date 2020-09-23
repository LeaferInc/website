import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BestPlantSearch, BestPlantResult } from 'src/app/shared/models/best-plant/best-plant.model';

@Injectable({
  providedIn: 'root'
})
export class BestPlantService {

  static readonly BASE_URL = 'best-plant';

  constructor(private http: HttpClient) { }

  /**
   * Determines the best plant for a user
   * @param bestPlant the user preferences
   */
  findBestPlant(bestPlant: BestPlantSearch): Observable<BestPlantResult> {
    return this.http.post<BestPlantResult>(BestPlantService.BASE_URL, bestPlant);
  }
}

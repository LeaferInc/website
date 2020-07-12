import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plant } from 'src/app/shared/models/plant/plant';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/shared/models/query/query';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  static readonly PLANT_URL = 'plants';

  constructor(private http: HttpClient) { }

  public createPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(PlantService.PLANT_URL, plant);
  }

  public findById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${PlantService.PLANT_URL}/one?criteria=${id}`);
  }

  public findAll(skip?: number, take?: number): Observable<ResultData<Plant>> {
    return this.http.get<ResultData<Plant>>(`${PlantService.PLANT_URL}/all`, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  };

  public findAllByUser(skip?: number, take?: number, search?: string): Observable<ResultData<Plant>> {
    const params = {
      skip: String(skip),
      take: String(take)
    };

    if(search) Object.assign(params, { search: search });

    return this.http.get<ResultData<Plant>>(`${PlantService.PLANT_URL}/my`, {
      params: params
    });
  };

  public findAllMyGarden(skip?: number, take?: number): Observable<ResultData<Plant>> {
    return this.http.get<ResultData<Plant>>(`${PlantService.PLANT_URL}/my-garden`, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  };

  public findAllExceptOwner(skip?: number, take?: number, search?: string): Observable<ResultData<Plant>> {
    const params = {
      skip: String(skip),
      take: String(take),
    };

    if(search) Object.assign(params, { search: search });

    return this.http.get<ResultData<Plant>>(`${PlantService.PLANT_URL}/findAllExceptOwner`, {
      params: params
    });
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${PlantService.PLANT_URL}/${id}`);
  }
}

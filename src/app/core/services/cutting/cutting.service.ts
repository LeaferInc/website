import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/shared/models/query/query';

@Injectable({
  providedIn: 'root'
})
export class CuttingService {

  static readonly USER_URL = 'cutting';

  constructor(private http: HttpClient) { }

  create(cutting: Cutting): Observable<Cutting> {
    return this.http.post<Cutting>(CuttingService.USER_URL, cutting);
  }

  findAllByUser(skip?: number, take?: number): Observable<ResultData<Cutting>> {
    return this.http.get<ResultData<Cutting>>(`${CuttingService.USER_URL}/my`, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  }

  findOne(id: number): Observable<Cutting> {
    return this.http.get<Cutting>(`${CuttingService.USER_URL}/${id}`);
  }

  findAllExchange(skip?: number, take?: number): Observable<ResultData<Cutting>> {
    return this.http.get<ResultData<Cutting>>(`${CuttingService.USER_URL}/exchange`, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  }
}

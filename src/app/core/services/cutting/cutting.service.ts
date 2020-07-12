import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/shared/models/query/query';

@Injectable({
  providedIn: 'root'
})
export class CuttingService {

  static readonly USER_URL = 'cuttings';

  constructor(private http: HttpClient) { }

  create(cutting: Cutting): Observable<Cutting> {
    return this.http.post<Cutting>(CuttingService.USER_URL, cutting);
  }

  findAllByUser(skip?: number, take?: number, search?: string): Observable<ResultData<Cutting>> {
    const params = {
      skip: String(skip),
      take: String(take)
    }

    if(search) Object.assign(params, { search: search });

    return this.http.get<ResultData<Cutting>>(`${CuttingService.USER_URL}/my`, {
      params: params
    });
  }

  findOne(id: number): Observable<Cutting> {
    return this.http.get<Cutting>(`${CuttingService.USER_URL}/${id}`);
  }

  findAllExchange(skip?: number, take?: number, search?: string): Observable<ResultData<Cutting>> {
    const params = {
      skip: String(skip),
      take: String(take)
    }

    if(search) Object.assign(params, { search: search });

    return this.http.get<ResultData<Cutting>>(`${CuttingService.USER_URL}/exchange`, {
      params: params
    });
  }

  findAll(skip?: number, take?: number): Observable<ResultData<Cutting>> {
    return this.http.get<ResultData<Cutting>>(`${CuttingService.USER_URL}/all`, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  }

  edit(cutting: Cutting): Observable<Cutting> {
    return this.http.put<Cutting>(CuttingService.USER_URL, cutting);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${CuttingService.USER_URL}/${id}`);
  }
}

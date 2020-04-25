import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuttingService {

  static readonly USER_URL = 'cutting';

  constructor(private http: HttpClient) { }

  create(cutting: Cutting): Observable<Cutting> {
    return this.http.post<Cutting>(CuttingService.USER_URL, cutting);
  }

  findAllByUser(): Observable<Array<Cutting>> {
    return this.http.get<Array<Cutting>>(`${CuttingService.USER_URL}/my`);
  }

  findOne(id: number): Observable<Cutting> {
    return this.http.get<Cutting>(`${CuttingService.USER_URL}/${id}`);
  }

  findAll(): Observable<Cutting[]> {
    return this.http.get<Cutting[]>(`${CuttingService.USER_URL}`);
  }
}

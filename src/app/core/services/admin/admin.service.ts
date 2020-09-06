import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistic } from 'src/app/shared/models/admin/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  static readonly ADMIN_URL = 'admin';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistic> {
    return this.http.get<Statistic>(`${AdminService.ADMIN_URL}/statistics`);
  }
}

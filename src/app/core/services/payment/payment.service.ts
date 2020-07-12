import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentClientSecret } from 'src/app/shared/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  static readonly PAYMENT_URL = 'payment';

  constructor(private http: HttpClient) { }

  createPaymenIntent(): Observable<PaymentClientSecret> {
    return this.http.post<PaymentClientSecret>(`${PaymentService.PAYMENT_URL}`, {});
  }
}

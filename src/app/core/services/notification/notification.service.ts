import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/shared/models/notification/notification';
import { ResultData } from 'src/app/shared/models/query/query';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  static readonly NOTIFICATION_URL = 'notification';

  constructor(private http: HttpClient) { }

  findNotificationByUser(): Observable<ResultData<Notification>> {
    return this.http.get<ResultData<Notification>>(`${NotificationService.NOTIFICATION_URL}/my`);
  }

  readNotification(notificationsId: number[]): Observable<Notification[]> {
    return this.http.post<Notification[]>(`${NotificationService.NOTIFICATION_URL}/readNotifications`, notificationsId);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  static readonly BASE_URL: string = "entry/";

  constructor(private http: HttpClient) { }

  /**
   * Register the user to the event's participants list
   */
  joinEvent(eventId: number): Observable<void> {
    return this.http.post<void>(EntryService.BASE_URL + "join/" + eventId, {});
  }

  /**
   * Unegister the user to the event's participants list
   */
  unjoinEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(EntryService.BASE_URL + "join/" + eventId);
  }
}

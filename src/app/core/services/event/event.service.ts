/**
 * @author ddaninthe
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/event/event.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {
  static readonly BASE_URL: string = "events/";

  constructor(private http: HttpClient) { }

  /**
   * Get all Events from the server 
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EventService.BASE_URL);
  }

  /**
   * Get a single Event from the server by its id
   */
  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(EventService.BASE_URL + id);
  }


  /**
   * Post an event to the server to save it
   * @param event The Event to create
   */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(EventService.BASE_URL, event);
  }
}

/**
 * @author ddaninthe
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/event/event.model';
import { HttpClient } from '@angular/common/http';
import { SearchEvent } from 'src/app/shared/models/event/searchEvent.model';
import { ResultData } from 'src/app/shared/models/query/query';


@Injectable()
export class EventService {
  static readonly BASE_URL: string = "events/";

  constructor(private http: HttpClient) { }

  /**
   * Get all Events from the server 
   */
  getEvents(skip?: number, take?: number): Observable<ResultData<Event>> {
    return this.http.get<ResultData<Event>>(EventService.BASE_URL, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  }

  /**
   * Get incoming events
   */
  getIncomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EventService.BASE_URL + "incoming");
  }

  /**
   * Get joined events
   */
  getJoinedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EventService.BASE_URL + "joined");
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

  /**
   * Search for events with criteria
   */
  searchEvents(search: SearchEvent): Observable<Event[]> {
    return this.http.get<Event[]>(EventService.BASE_URL + `search?${search.toUrlParams()}`);
  }

  // delete(): Observable<unknown> {
  //   return this.http.delete(``);
  // }
}

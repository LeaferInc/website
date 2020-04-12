/**
 * @author ddaninthe
 */

import { Injectable } from '@angular/core';
import { DataService } from '../common/data.service';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {
  static readonly BASE_URL: string = DataService.SERVER_URL + "events/";

  constructor(private http: HttpClient, private dataService: DataService) { }

  /**
   * Get all {@link Event} from the server 
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EventService.BASE_URL, { headers: this.dataService.headers });
  }

  /**
   * Get a single {@link Event} from the server by its id
   */
  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(EventService.BASE_URL + id, { headers: this.dataService.headers });
  }


  /**
   * Post an event to the server to save it
   * @param event The {@link Event} to create
   */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(EventService.BASE_URL, event, { headers: this.dataService.headers });
  }
}

import { Event } from '../models/event/event.model';
import { EventService } from '../../core/services/event/event.service';
import { of, Observable } from 'rxjs';
import { ResultData } from '../models/query/query';

export class MockEventService extends EventService {
  public static events: Event[] = [
    new Event("Test name 1", "Test description 1.",
      "23 Test street", new Date(2020, 10, 10, 15), new Date(2020, 10,10, 20), 0, 10, 43.656653, 4.21212, false, 1),
      new Event("Test name 2", "Test description 2",
      "19 of another street", new Date(2020, 5, 3, 23), new Date(2020, 5, 4, 4), 0, 10, 45.43, 2.12, true, 2)];

  getEvents(skip?: number, take?: number): Observable<Event[]> {
    return of(MockEventService.events);
  }

  getJoinedEvents(): Observable<Event[]> {
    return of(MockEventService.events);
  }

  getIncomingEvents(): Observable<Event[]> {
    return of(MockEventService.events);
  }

  searchEvents(): Observable<Event[]> {
    return of(MockEventService.events);
  }
}

import { Event } from '../models/event/event.model';
import { EventService } from '../../core/services/event/event.service';
import { of, Observable } from 'rxjs';

export class MockEventService extends EventService {
  events: Event[] = [
    new Event("Test name 1", "Test description 1.",
      "23 Test street", new Date(), new Date(), 0, 10, 43.656653, 4.21212, false, 1)];

  getEvents(): Observable<Event[]> {
    return of(this.events);
  }
}

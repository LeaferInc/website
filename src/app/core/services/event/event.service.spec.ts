/**
 * @author ddaninthe
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'

import { EventService } from './event.service';
import { Event } from 'src/app/shared/models/event/event.model';
import { ResultData } from 'src/app/shared/models/query/query';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  let events: Event[] = [
    new Event("Test name 1", "Test description 1.", 
    "23 Test street", new Date(), new Date(), 0, 10, 43.656653, 4.21212, true),
    new Event("Test name 2", "Test description 2", 
    "2nd Street Test", new Date(), new Date(), 0, 200, 12.6653, 35.76687)]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 2 events', async () => {
    service.getEvents().subscribe((e: ResultData<Event>) => {
      expect(e).toBeTruthy();
      expect(e).toHaveLength(2);
      expect(e).toBe({items: events, count: 2} as ResultData<Event>);
    });
    const req: TestRequest = httpMock.expectOne(`${EventService.BASE_URL}?skip=undefined&take=undefined`);
    req.flush(events);
    expect(req.request.method).toBe('GET');

    httpMock.verify();
  });

  it('should return 1 event by its id', async () => {
    service.getEvent(1).subscribe((e: Event) => {
      expect(e).toBeTruthy();
      expect(e).toBe(events[0]);
    });
    const req: TestRequest = httpMock.expectOne(EventService.BASE_URL + "1");
    req.flush(events[0]);
    expect(req.request.method).toBe('GET');

    httpMock.verify();
  });

  it('should post an event', async() => {
    const event: Event = new Event("Test", "descrption", "location", new Date(), new Date(), 10, 50, 1.1, 2.56);

    service.addEvent(event).subscribe((e: Event) => {
      expect(e).toBeTruthy();
      expect(e).toBe(event);
    });
    const req: TestRequest = httpMock.expectOne(EventService.BASE_URL);
    req.flush(event);
    expect(req.request.method).toBe('POST');

    httpMock.verify();
  });
});

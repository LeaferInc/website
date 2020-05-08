import { EventPipe } from './event.pipe';
import { Event } from '../models/event/event.model';
import { MockEventService } from '../mocks/event.service.mock';

describe('EventPipe', () => {
  it('create an instance', () => {
    const pipe = new EventPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter events', () =>{
    const pipe = new EventPipe();
    let result: Event[] = pipe.transform(MockEventService.events, null);
    expect(result).toHaveLength(2);
    expect(result).toBe(MockEventService.events);

    result = pipe.transform(MockEventService.events, 'NaMe 2');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);

    result = pipe.transform(MockEventService.events, 'ejoajfioefjo ehfaeufae');
    expect(result).toHaveLength(0);

    result = pipe.transform(MockEventService.events, 'descripTION 1');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});

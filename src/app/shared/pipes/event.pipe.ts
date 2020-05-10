import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event/event.model';

@Pipe({
  name: 'eventFilter'
})
export class EventPipe implements PipeTransform {

  /**
   * Filter the list of events.
   * @param events the events to filter
   * @param filter the string research
   * 
   * @returns the filtered array
   */
  transform(events: Event[], filter: string): Event[] {
    if (!filter || filter.length < 1) {
      return events;
    }

    filter = filter.toLocaleLowerCase().trim();
    return events.filter((event: Event) => event.name.toLocaleLowerCase().indexOf(filter) !== -1
      || event.description.toLocaleLowerCase().indexOf(filter) !== -1);

  }

}

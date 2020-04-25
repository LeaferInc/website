import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from '../../../../shared/models/event/event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: Array<Event> = [];

  constructor(private eventService: EventService) { }

  /**
   * Load the list of {@link Event} to be displayed.
   */
  ngOnInit(): void {
    console.log("on Init");
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        console.log(events);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}

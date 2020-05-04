import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from '../../../../shared/models/event/event.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  incomingEvents: Array<Event> = []; // List of incoming events
  enteredEvents: Array<Event> = []; // List of entered events
  interestedEvent: Array<Event> = []; // List of favorited events
  filter: string; // Event filter

  constructor(private eventService: EventService) { }

  /**
   * Load the list of Events to be displayed.
   */
  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.enteredEvents = events;
        this.incomingEvents = events;
        this.interestedEvent = events;
        console.log(events);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}

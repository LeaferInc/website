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
  joinedEvents: Array<Event> = []; // List of events joined
  organizedEvents: Array<Event> = [] // List of all events organized
  filter: string; // Event filter

  constructor(private eventService: EventService) { }

  /**
   * Load the list of Events to be displayed.
   */
  ngOnInit(): void {
    // Incoming events
    this.eventService.getIncomingEvents().subscribe(
      (events: Event[]) => {
        //this.incomingEvents = events;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    // Joined events
    this.eventService.getJoinedEvents().subscribe(
      (events: Event[]) => {
        this.joinedEvents = events;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    // Organized events
    this.eventService.getJoinedEvents().subscribe(
      (events: Event[]) => {
        this.organizedEvents = events;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    // All events
    /*this.eventService.getEvents(0, 500).subscribe(
      (events: Event[]) => {
        this.allEvents = events;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );*/
  }
}

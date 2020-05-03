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
  events: Array<Event> = [];
  filter: string; // Research filter

  constructor(private eventService: EventService) { }

  /**
   * Load the list of Events to be displayed.
   */
  ngOnInit(): void {
    console.log("on Init");
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        console.log(events);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}

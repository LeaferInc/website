/**
 * @author ddaninthe
 */

import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event/event.service';
import { Event } from 'src/app/event/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  events: Array<Event> = [];
  showForm: boolean = true; //TODO: false;

  constructor(private eventService: EventService) { }

  /**
   * Load the list of {@link Event} to be displayed.
   */
  ngOnInit(): void {

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

  addEvent(event): void {
    this.events.push(event);
    this.showForm = false;
  }
}

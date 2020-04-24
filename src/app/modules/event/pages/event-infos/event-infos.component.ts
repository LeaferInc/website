import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from 'src/app/shared/models/event/event.model';


@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.scss']
})
export class EventInfosComponent implements OnInit {
  event: Event;
  participating: boolean = null;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id && Number.isInteger(Number.parseInt(params.id))) {
        this.eventService.getEvent(params.id).subscribe(
          (event: Event) => {
            console.log(event);
            this.event = event;
          },
          (e: Error) => {
            console.log(e);
          }
        );
      } else {
        // TODO: redirect 404
      }
    });

    // TODO: get Entry State
  }

  participate(): void {
    // TODO: Add Entry
  }

  leave(): void {
    // TODO: remove entry
  }
}

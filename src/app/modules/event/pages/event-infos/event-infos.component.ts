import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from 'src/app/shared/models/event/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EntryService } from 'src/app/core/services/entry/entry.service';


@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.scss']
})
export class EventInfosComponent implements OnInit {
  event: Event;
  querying: boolean = false; // True if waiting for a server response

  constructor(private route: ActivatedRoute, private router: Router,
    private eventService: EventService, private entryService: EntryService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id && Number.isInteger(Number.parseInt(params.id))) {
        this.eventService.getEvent(params.id).subscribe(
          (event: Event) => {
            console.log(event);
            this.event = event;
          },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.router.navigate(['/404']);
            }
          });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  participate(): void {
    this.querying = true;
    this.entryService.joinEvent(this.event.id).subscribe(
      () => this.event.joined = true,
      (err: HttpErrorResponse) => {
        console.log(err);
      },
      () => this.querying = false
    );
  }

  leave(): void {
    this.querying = true;
    this.entryService.unjoinEvent(this.event.id).subscribe(
      () => this.event.joined = false,
      (err: HttpErrorResponse) => {
        console.log(err);
      },
      () => this.querying = false
    );
  }
}

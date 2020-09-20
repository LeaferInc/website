import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from 'src/app/shared/models/event/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EntryService } from 'src/app/core/services/entry/entry.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { User, Entrant } from 'src/app/shared/models/user/user';
import { ColumnItem } from 'src/app/shared/models/ngzorro/column.item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.scss'],
})
export class EventInfosComponent implements OnInit, OnDestroy {
  event: Event;
  querying: boolean = false; // True if waiting for a server response
  currentUser: User;
  isModalVisible: boolean = false;

  currentPage: Entrant[] = [];
  listOfColumns: ColumnItem[] = [
    {
      name: "Nom d'utilisateur",
      sortOrder: 'ascend',
      sortFn: (a: Entrant, b: Entrant) => a.username.localeCompare(b.username),
    },
    {
      name: 'Prénom',
      sortOrder: null,
      sortFn: (a: Entrant, b: Entrant) => a.firstname.localeCompare(b.firstname),
    },
    {
      name: 'Nom',
      sortOrder: null,
      sortFn: (a: Entrant, b: Entrant) => a.lastname.localeCompare(b.lastname),
    },
  ];

  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private entryService: EntryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe((params: Params) => {
        if (params.id && Number.isInteger(Number.parseInt(params.id))) {
          this.eventService.getEvent(params.id).subscribe(
            (event: Event) => {
              this.event = event;
            },
            (err: HttpErrorResponse) => {
              if (err.status === 404) {
                this.router.navigate(['/404']);
              }
            }
          );
        } else {
          this.router.navigate(['/404']);
        }
      })
    );

    this.sub.add(
      this.authService.getUserAuth().subscribe(
        (userAuth: UserAuth) => {
          this.currentUser = userAuth.user;
        },
        (e) => console.log(e)
      )
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Whether or not the event is over
   */
  isEventFinished(): boolean {
    return new Date(this.event.endDate) < new Date();
  }

  /**
   * Joins an event
   */
  participate(): void {
    this.querying = true;
    this.sub.add(
      this.entryService.joinEvent(this.event.id).subscribe(
        () => {
          this.event.joined = true;
          const entrant: Entrant = {
            id: this.currentUser.id,
            username: this.currentUser.username,
            firstname: this.currentUser.firstname,
            lastname: this.currentUser.lastname,
          };
          // Need immutable array
          this.event.entrants = [...this.event.entrants, entrant];
        },
        (err: HttpErrorResponse) => {
          if (err.status === 403) {
            alert('Aucune place disponible!');
          }
          console.log(err);
        },
        () => (this.querying = false)
      )
    );
  }

  /**
   * Leaves the event
   */
  leave(): void {
    this.querying = true;
    this.sub.add(
      this.entryService.unjoinEvent(this.event.id).subscribe(
        () => {
          this.event.joined = false;
          this.event.entrants = this.event.entrants.filter((e: Entrant) => e.id !== this.currentUser.id);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        },
        () => (this.querying = false)
      )
    );
  }

  /**
   * Deletes an event
   */
  deleteEvent(): void {
    this.querying = true;
    this.sub.add(
      this.eventService.deleteEvent(this.event.id).subscribe(
        () => {
          this.router.navigate(['events']);
        },
        (err: HttpErrorResponse) => {
          this.querying = false;
          console.log(err);
        }
      )
    );
  }
}

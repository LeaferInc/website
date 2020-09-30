import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/shared/models/event/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, OnDestroy {

  @Output() deleted = new EventEmitter<void>();
  @Input() count: number = 0; // Amount of events

  public events: Event[] = [];

  public expandSet = new Set<number>();

  public pageIndex = 1;
  public pageSize = 8;

  private sub: Subscription = new Subscription();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  loadDataFromServer(pageIndex?: number, pageSize?: number) {
    this.sub.add(
      this.eventService.getEvents((pageIndex - 1) * pageSize || 0, pageSize).subscribe({
        next: (events) => (this.events = events),
      })
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  deleteEvent(id: number) {
    this.eventService
      .deleteEvent(id)
      .pipe(
        switchMap(() => this.eventService.getEvents((this.pageIndex - 1) * this.pageSize || 0, this.pageSize))
      ).subscribe({
        next: (events) => {
          this.events = events;
          this.count--;
          this.deleted.emit();
        }
      });
  }
}

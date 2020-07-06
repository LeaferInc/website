import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { switchMap } from 'rxjs/operators';
import { ResultData } from 'src/app/shared/models/query/query';
import { Event } from 'src/app/shared/models/event/event.model';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  public events: Event[] = [];

  public expandSet = new Set<number>();

  public pageIndex = 1;
  public pageSize = 8;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  loadDataFromServer(pageIndex?: number, pageSize?: number) {
    this.eventService
      .getEvents(((pageIndex - 1) * pageSize) || 0, pageSize)
      .subscribe({
        next: (events) => this.events = events
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  deleteEvent(id: number) {
    // this.eventService
    //   .delete(id)
    //   .pipe(
    //     switchMap(() => this.eventService.getAll())
    //   ).subscribe({
    //     next: (events) => this.events = events
    //   });
    alert('Delete ' + id);
  }

}

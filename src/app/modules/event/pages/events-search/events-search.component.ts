import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from '../../../../shared/models/event/event.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SearchEvent } from 'src/app/shared/models/event/searchEvent.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-events-search',
  templateUrl: './events-search.component.html',
  styleUrls: ['./events-search.component.scss']
})
export class EventsSearchComponent implements OnInit {

  dateForm: FormGroup; // Search for date

  searchedEvents: Array<Event> = []; // Searched events
  searched: boolean = false; // True if a search has been made

  constructor(private eventService: EventService, private builder: FormBuilder) { }

  ngOnInit(): void {
    // Default start date is next day
    const startDate: Date = new Date();
    startDate.setDate(startDate.getDate() + 1);
    startDate.setMinutes(0);
    this.dateForm = new FormGroup({
      startDate: new FormControl(UtilsService.dateToJSONLocal(startDate).slice(0, 16), [Validators.required]),
    });
  }

  /**
   * Search events by closest location
   */
  searchClosest(): void {
    console.log("closest");
  }

  /**
   * Search events by date
   */
  searchDate(): void {
    if (this.dateForm.valid) {
      const date = new Date(this.dateForm.get('startDate').value);

      const search = SearchEvent.fromDate(date);
      this.eventService.searchEvents(search).subscribe((events: Event[]) => {
        this.searchedEvents = events;
        this.searched = true;
      },
        (e: HttpErrorResponse) => {
          console.log(e);
        });
    }
  }
}

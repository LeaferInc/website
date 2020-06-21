import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from '../../../../shared/models/event/event.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchEvent } from 'src/app/shared/models/event/searchEvent.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Location } from 'src/app/shared/models/location/location.model';
import { ActivatedRoute } from '@angular/router';

export enum SearchType {
  LOCATION,
  DATE,
}

@Component({
  selector: 'app-events-search',
  templateUrl: './events-search.component.html',
  styleUrls: ['./events-search.component.scss']
})
export class EventsSearchComponent implements OnInit {

  searchType: SearchType = SearchType.DATE; // Default to date search

  dateForm: FormGroup; // Form for date search
  searchedEvents: Array<Event> = []; // Searched events
  searched: boolean = false; // True if the search has been done

  constructor(private eventService: EventService, private route: ActivatedRoute, private utils: UtilsService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { searchType: SearchType }) => {
      this.searchType = data.searchType;
    });


    // Date Search
    if (this.searchType == SearchType.DATE) {
      // Default start date is next day
      const startDate: Date = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setMinutes(0);
      this.dateForm = new FormGroup({
        startDate: new FormControl(UtilsService.dateToJSONLocal(startDate).slice(0, 16), [Validators.required]),
      });
    }

    // Location Search
    if (this.searchType == SearchType.LOCATION) {
      this.utils.getCurrentLocation()
        .then((loc: Location) => {
          const search = SearchEvent.fromLocation(loc.lat, loc.long);
          this.doSearch(search);
        }).catch(err => console.log(err));
    }
  }

  /**
   * True if search type is date search
   */
  isDateSearch(): boolean {
    return this.searchType === SearchType.DATE;
  }

  /**
   * Search events by date
   */
  searchDate(): void {
    if (this.dateForm.valid) {
      const date = new Date(this.dateForm.get('startDate').value);
      const search = SearchEvent.fromDate(date);
      this.doSearch(search);
    }
  }

  /**
   * Perform search request
   * @param query object with query parameters
   */
  private doSearch(query: SearchEvent): void {
    this.eventService.searchEvents(query).subscribe((events: Event[]) => {
      this.searchedEvents = events;
      this.searched = true;
    }), (e: HttpErrorResponse) => {
      console.log(e);
    }
  }
}

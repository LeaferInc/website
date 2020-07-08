/**
 * @author ddaninthe
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from 'src/app/core/services/event/event.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Event } from 'src/app/shared/models/event/event.model';
import { Location } from 'src/app/shared/models/location/location.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrls: ['./create-event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  sending: boolean = false; // True when the form has been sent to server

  locationChoosed: Location = null; // The Location the user has selected
  locationChoosedSubject  = new Subject<string>();
  locationTimeout: NodeJS.Timeout; // Delay to search for addresses after user's input
  locations: Location[] = []; // The found addresses
  
  minDate: Date = new Date(); // Minimum choosable Date

  newImage: UploadFile;

  @Output() created = new EventEmitter<Event>();

  constructor(private eventService: EventService, private utilsService: UtilsService, private router: Router) {}

  ngOnInit(): void {
    // Default start date is next day
    const startDate: Date = new Date();
    startDate.setDate(startDate.getDate() + 1);
    startDate.setMinutes(0);

    // Default end date is `startDate` plus 4 hours
    const endDate: Date = new Date(startDate);
    endDate.setHours(startDate.getHours() + 4);

    // Form initialization
    this.eventForm = new FormGroup({
      name: new FormControl('Un nom au hasard', [Validators.required]),
      description: new FormControl('Un évènement comme un autre, il faut meubler pour remplir la textarea.', [
        Validators.required,
      ]),
      startDate: new FormControl(UtilsService.dateToJSONLocal(startDate).slice(0, 16), [Validators.required]),
      endDate: new FormControl(UtilsService.dateToJSONLocal(endDate).slice(0, 16), [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      maxPeople: new FormControl(10, [Validators.required, Validators.min(1)]),
    });

    this.locationChoosedSubject.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap((addr) => this.utilsService.getLocations(addr))
    ).subscribe({
      next: (locations) => this.locations = locations
    });
  }

  /**
   * Submit the form to the server to add an Event.
   * Checks the anteriority of the start Date over the end Date
   */
  async submit(): Promise<void> {
    // TODO
    // Display validation
    Object.keys(this.eventForm.controls).forEach((key) => {
      this.eventForm.get(key).markAsDirty();
      this.eventForm.get(key).updateValueAndValidity();
    });

    const startBeforeEnd: boolean = this.eventForm.get('startDate').value < this.eventForm.get('endDate').value;

    // Create form
    if (startBeforeEnd && this.eventForm.valid && this.locationChoosed) {
      this.sending = true;

      const event: Event = this.eventForm.value;
      event.location = this.locationChoosed.label;
      event.latitude = this.locationChoosed.lat;
      event.longitude = this.locationChoosed.long;
      event.startDate = new Date(event.startDate);
      event.endDate = new Date(event.endDate);

      // Handle image
      if (this.newImage) {
        event.picture = await UtilsService.toBase64(this.newImage);
      }

      this.eventService.addEvent(event).subscribe(
        (event: Event) => {
          this.router.navigate(['events', event.id.toString()]);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        },
        () =>  {
          this.sending = false;
        }
      );
    }
  }
}

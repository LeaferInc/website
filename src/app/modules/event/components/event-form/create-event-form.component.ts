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

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrls: ['./create-event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  sending: boolean = false; // True when the form has been sent to server
  locationChoosed: Location = null; // The Location the user has selected
  locationTimeout: NodeJS.Timeout; // Delay to search for addresses after user's input
  locations: Location[] = []; // The found addresses
  minDate: Date = new Date(); // Minimum choosable Date
  showDropdown: boolean = false; // True when the dropdown should be shown

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
      location: new FormControl({
        label: '23, Rue de la Marquise',
        lat: 45,
        long: 3,
      } as Location, [Validators.required]),
      // latitude: new FormControl(),
      // longitude: new FormControl(),
      startDate: new FormControl(UtilsService.dateToJSONLocal(startDate).slice(0, 16), [Validators.required]),
      endDate: new FormControl(UtilsService.dateToJSONLocal(endDate).slice(0, 16), [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      maxPeople: new FormControl(10, [Validators.required, Validators.min(1)]),
    });
  }

  /**
   * Search potential locations matching with the user's input
   * @param address The address to search for
   */
  getLocations(address: string): void {
    // Don't search if address is empty or if value has been set by `setFormLocation()`
    if (address && (!this.locationChoosed || address !== this.locationChoosed.label)) {
      this.locationChoosed = null;
      this.showDropdown = true;
      clearTimeout(this.locationTimeout);
      this.locationTimeout = setTimeout(() => {
        this.utilsService.getLocations(address).subscribe(
          (locs: Location[]) => {
            this.showDropdown = true;
            this.locations = locs;

            if (!locs.length) {
              this.showDropdown = false;
              this.locationChoosed = null;
            }
          },
          (err: Error) => {
            console.log(err);
          }
        );
      }, 2000);
    }
  }

  /**
   * Sets the coordinates of the chosen location in the form object
   * @param location The Location choosed
   */
  // setFormLocation(location: Location): void {
  //   this.locationChoosed = location;
  //   this.eventForm.get('latitude').setValue(location.lat);
  //   this.eventForm.get('longitude').setValue(location.long);
  //   this.eventForm.get('location').setValue(location.label);
  //   this.showDropdown = false;
  //   this.locations = [];
  // }

  /**
   * Submit the form to the server to add an Event.
   * Checks the anteriority of the start Date over the end Date
   */
  submit(): void {
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
      this.eventService.addEvent(event).subscribe(
        (event: Event) => {
          this.router.navigate(['/events/' + event.id]);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        },
        () => (this.sending = false)
      );
    }
  }
}

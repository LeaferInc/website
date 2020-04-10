/**
 * @author ddaninthe
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from 'src/app/event/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  eventForm: FormGroup;
  @Output() created = new EventEmitter<Event>();

  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl('Un nom au hasard', [Validators.required]),
      description: new FormControl('Une évènement comment un autre, il faut meubler pour remplir la textarea.', [Validators.required]),
      location: new FormControl('23, Rue de la Marquise', [Validators.required]),
      startDate: new FormControl(new Date(), [Validators.required]),
      endDate: new FormControl(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      maxPeople: new FormControl(10, [Validators.required]),
    });
  }

  /**
 * Submit the form to the server to add an {@link Event}
 */
  submit(): void {
    if (this.eventForm.valid) {
      // TODO: remove
      this.eventForm.value.latitude = 43.656653;
      this.eventForm.value.longitude = 4.21212;
      const event: Event = this.eventForm.value;

      this.eventService.addEvent(event).subscribe(
        (event: Event) => {
          console.log(event);
          this.created.emit(event);
        },
        (err: Error) => {
          console.log(err);
        }
      )
    }
  }
}

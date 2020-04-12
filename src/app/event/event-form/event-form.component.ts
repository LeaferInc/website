/**
 * @author ddaninthe
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from 'src/app/event/event.model';
import { UtilsService } from 'src/app/common/utils.service';
import { Location } from '../../common/location.model';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

    eventForm: FormGroup;
    sending: boolean = false; // True when the form has been sent to server
    locations: Location[] = [];
    locationTimeout: NodeJS.Timeout;
    @Output() created = new EventEmitter<Event>();

    constructor(private eventService: EventService, private utilsService: UtilsService) { }

    ngOnInit(): void {
        // Default start date is next day
        const startDate: Date = new Date();
        startDate.setDate(startDate.getDate() + 1);
        startDate.setMinutes(0);

        // Default end date is `startDate` plus 4 hours
        const endDate: Date = new Date(startDate)
        endDate.setHours(startDate.getHours() + 4);

        this.eventForm = new FormGroup({
            name: new FormControl('Un nom au hasard', [Validators.required]),
            description: new FormControl('Un évènement comme un autre, il faut meubler pour remplir la textarea.', [Validators.required]),
            location: new FormControl('23, Rue de la Marquise', [Validators.required]),
            startDate: new FormControl(UtilsService.dateToJSONLocal(startDate).slice(0, 16), [Validators.required]),
            endDate: new FormControl(UtilsService.dateToJSONLocal(endDate).slice(0, 16), [Validators.required]),
            price: new FormControl(0, [Validators.required]),
            maxPeople: new FormControl(10, [Validators.required]),
        });
    }

    test(eve, type) {
        console.log(type);
        console.log(eve);
        this.setFormLocation(new Location("23, rue de la Marquise", 48, 2));
    }

    getLocations(address: string): void {
        clearTimeout(this.locationTimeout);
        /*this.locationTimeout = setTimeout(() => {
            this.utilsService.getLocations(address).subscribe(
                (locs: Location[]) => {
                    console.log(locs);
                    this.locations = locs;
                },
                (err: Error) => {
                    console.log(err);
                }
            );
        }, 2000);*/
    }

    setFormLocation(location: Location): void {
        this.eventForm.value.latitude = location.lat;
        this.eventForm.value.longitude = location.long;
    }

    /**
     * Submit the form to the server to add an {@link Event}
     */
    submit(): void {
        // Display validation
        Object.keys(this.eventForm.controls).forEach(key => {
            this.eventForm.get(key).markAsDirty();
        });
        console.log(this.eventForm);

        // Create form
        if (false){//this.eventForm.valid) {
            //this.sending = true;

            const event: Event = this.eventForm.value;
            /*this.eventService.addEvent(event).subscribe(
                (event: Event) => {
                    this.created.emit(event);
                },
                (err: Error) => {
                    console.log(err);
                }
            );*/
            console.log(event);
        }
    }
}

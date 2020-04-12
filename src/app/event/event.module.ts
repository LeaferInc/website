/**
 * @author ddaninthe
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventComponent } from '../views/event/event.component';
import { EventService } from './event.service';
import { EventFormComponent } from './event-form/event-form.component';
import { UtilsService } from '../common/utils.service';


@NgModule({
  declarations: [EventComponent, EventFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    EventService,
    UtilsService
  ]
})
export class EventModule { }

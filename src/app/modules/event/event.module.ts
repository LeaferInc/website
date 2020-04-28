/**
 * @author ddaninthe
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventRoutingModule } from './event-routing.module';

import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventFormComponent } from './components/event-form/create-event-form.component';
import { EventInfosComponent } from './pages/event-infos/event-infos.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventsListComponent } from './pages/events-list/events-list.component';

import { EventService } from 'src/app/core/services/event/event.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { EntryService } from 'src/app/core/services/entry/entry.service';

@NgModule({
  declarations: [EventFormComponent, CreateEventComponent, EventInfosComponent, EventCardComponent, EventsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventRoutingModule,
  ],
  providers: [
    EventService,
    EntryService,
    UtilsService,
  ]
})
export class EventModule { }

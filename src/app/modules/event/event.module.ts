/**
 * @author ddaninthe
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventRoutingModule } from './event-routing.module';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventFormComponent } from './components/event-form/create-event-form.component';
import { EventInfosComponent } from './pages/event-infos/event-infos.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { EventService } from 'src/app/core/services/event/event.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { EntryService } from 'src/app/core/services/entry/entry.service';
import { EventPipe } from 'src/app/shared/pipes/event.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@NgModule({
  declarations: [
    EventFormComponent,
    CreateEventComponent,
    EventInfosComponent,
    EventCardComponent,
    EventsListComponent,
    EventPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzCardModule,
    NzAutocompleteModule
  ],
  providers: [
    EventService,
    EntryService,
    UtilsService,
  ]
})
export class EventModule { }

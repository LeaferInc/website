import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { EventInfosComponent } from './pages/event-infos/event-infos.component';
import { EventsSearchComponent, SearchType } from './pages/events-search/events-search.component';

const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'search/closest', component: EventsSearchComponent, data: { searchType: SearchType.LOCATION } },
  { path: 'search/date', component: EventsSearchComponent, data: { searchType: SearchType.DATE } },
  { path: 'search', redirectTo: 'search/date', pathMatch: 'full'},
  { path: ':id', component: EventInfosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }

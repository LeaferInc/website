import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuttingRoutingModule } from './cutting-routing.module';
import { CreateCuttingComponent } from './pages/create-cutting/create-cutting.component';
import { DetailsCuttingComponent } from './pages/details-cutting/details-cutting.component';
import { MyCuttingComponent } from './pages/my-cutting/my-cutting.component';
import { ListCuttingComponent } from './pages/list-cutting/list-cutting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyCuttingCardComponent } from './components/my-cutting-card/my-cutting-card.component';
import { ListCuttingCardComponent } from './components/list-cutting-card/list-cutting-card.component';
@NgModule({
  declarations: [
    CreateCuttingComponent,
    DetailsCuttingComponent,
    MyCuttingComponent,
    ListCuttingComponent,
    MyCuttingCardComponent,
    ListCuttingCardComponent
  ],
  imports: [CommonModule, CuttingRoutingModule, ReactiveFormsModule],
})
export class CuttingModule {}

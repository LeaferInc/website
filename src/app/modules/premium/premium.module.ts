import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumRoutingModule } from './premium-routing.module';
import { PremiumHomeComponent } from './pages/premium-home/premium-home.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [PremiumHomeComponent],
  imports: [
    CommonModule,
    PremiumRoutingModule,
    NzGridModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSpinModule,
    NzInputModule,
    NzFormModule,
  ]
})
export class PremiumModule { }

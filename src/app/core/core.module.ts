import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzMessageModule,
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }

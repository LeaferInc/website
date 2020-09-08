import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecognitionComponent } from './pages/recognition/recognition.component';

const routes: Routes = [
  { path: '', component: RecognitionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecognitionRoutingModule { }

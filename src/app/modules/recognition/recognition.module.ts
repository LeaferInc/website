import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecognitionComponent } from './pages/recognition/recognition.component';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { RecognitionRoutingModule } from './recognition-routing.module';
import { RecognitionService } from 'src/app/core/services/recognition/recognition.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [RecognitionComponent],
  imports: [
    CommonModule,
    ImagePickerModule,
    RecognitionRoutingModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzGridModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
  ],
  providers: [RecognitionService]
})
export class RecognitionModule { }

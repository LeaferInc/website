import { NgModule } from '@angular/core';
import { ImagePickerComponent } from './image-picker.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchOutline } from '@ant-design/icons-angular/icons';

@NgModule({
    declarations: [ImagePickerComponent],
    imports: [
        NzButtonModule,
        NzFormModule,
        NzUploadModule,
        NzIconModule.forChild([SearchOutline]),
    ],
    exports: [ImagePickerComponent],
})
export class ImagePickerModule { }
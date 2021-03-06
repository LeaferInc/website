import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyProfileComponent } from './pages/my-profile/my.profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserRoutingModule } from './user-routing.module';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    MyProfileComponent,
    ProfileComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzCardModule,
    NzAutocompleteModule,
    NzMessageModule,
    NzDividerModule,
    NzTypographyModule,
    NzModalModule,
    NzIconModule.forChild([SearchOutline]),
    ImagePickerModule,
  ],
  providers: [UserService],
})
export class UserModule { }

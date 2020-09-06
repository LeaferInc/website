import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MockAuthService } from 'src/app/shared/mocks/auth.service.mock';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NzGridModule,
        NzInputModule,
        NzAutocompleteModule,
        NzUploadModule,
        ImagePickerModule,
      ],
      declarations: [UserEditComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        UserService,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

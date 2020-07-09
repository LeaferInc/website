import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumHomeComponent } from './premium-home.component';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { User } from 'src/app/shared/models/user/user';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { of } from 'rxjs';

describe('PremiumHomeComponent', () => {
  let component: PremiumHomeComponent;
  let fixture: ComponentFixture<PremiumHomeComponent>;
  const authServiceMock = {
    getUserAuth: jest.fn(() => {
      const user: User = {
        email: 'email',
        username: 'username',
        premium: false,
      };
      const userAuth: UserAuth = {
        token: '',
        user: user
      };
      return of(userAuth);
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NzInputModule,
        NzSpinModule,
        NzFormModule,
      ],
      providers: [
        { provide: PaymentService, useValue: {}},
        { provide: AuthService, useValue: authServiceMock}
      ],
      declarations: [ PremiumHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

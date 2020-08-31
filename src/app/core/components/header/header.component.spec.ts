import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock = {
    getUserAuth: jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized the component', () => {
    const userAuth: UserAuth = {
      user: {
        id: 0,
        email: 'email@email.com',
        username: 'username',
        firstname: 'John',
        lastname: 'Doe',
      },
      token: 'token'
    };

    authServiceMock.getUserAuth.mockReturnValue(of(userAuth));

    fixture.detectChanges();

    expect(component.currentUser).toEqual(userAuth.user);
  });
});

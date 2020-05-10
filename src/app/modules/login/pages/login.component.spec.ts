import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authServiceMock = {
    login: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, NzFormModule, NzButtonModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a request with his login and password when the user tries to login', () => {
    authServiceMock.login.mockReturnValue(of());
    component.usernameInput.setValue('username');
    component.passwordInput.setValue('password');

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('username', 'password');
  });
  
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/shared/models/user/user';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceMock = {
    create: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userServiceMock.create.mockReset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a request when the user try to register', () => {
    userServiceMock.create.mockReturnValue(of());

    component.usernameInput.setValue('username');
    component.emailInput.setValue('email@email.com');
    component.passwordInput.setValue('password');
    component.passwordConfirmInput.setValue('password');
    component.firstnameInput.setValue('firstname');
    component.lastnameInput.setValue('lastname');

    const user: User = {
      username: component.usernameInput.value,
      email: component.emailInput.value,
      firstname: component.firstnameInput.value,
      lastname: component.lastnameInput.value,
    }

    component.onSubmit();

    expect(userServiceMock.create).toHaveBeenCalledWith(user, component.passwordInput.value);
  });

  it('should not make a request when the user try to r'+
  'egister due to the invalid email and password missmatch ', () => {
    userServiceMock.create.mockReturnValue(of());

    component.usernameInput.setValue('username');
    component.emailInput.setValue('email');
    component.passwordInput.setValue('password');
    component.passwordConfirmInput.setValue('passwordConfirm');
    component.firstnameInput.setValue('firstname');
    component.lastnameInput.setValue('lastname');

    const user: User = {
      username: component.usernameInput.value,
      email: component.emailInput.value,
      firstname: component.firstnameInput.value,
      lastname: component.lastnameInput.value,
    }

    component.onSubmit();

    expect(userServiceMock.create).toHaveBeenCalledTimes(0);
  });
});

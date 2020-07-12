import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MockAuthService } from 'src/app/shared/mocks/auth.service.mock';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MockUserService } from 'src/app/shared/mocks/user.service.mock';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NzGridModule,
        NzModalModule,
      ],
      declarations: [ ProfileComponent ],
      providers: [
        { provide : AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current user', () => {
    expect(component.user).toBeTruthy();
    expect(component.user.email).toBe('test@email.com');
    expect(component.user.username).toBe('azerty123');
    expect(component.user.firstname).toBe('John');
    expect(component.user.lastname).toBe('Doe');
  });
});

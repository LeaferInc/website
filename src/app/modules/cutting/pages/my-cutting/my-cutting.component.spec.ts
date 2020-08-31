import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCuttingComponent } from './my-cutting.component';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

describe('MyCuttingComponent', () => {
  const cuttings = [new Cutting(), new Cutting()];

  let component: MyCuttingComponent;
  let fixture: ComponentFixture<MyCuttingComponent>;
  let cuttingServiceMock = {
    findAllByUser: jest.fn(() => of(cuttings)),
  };
  const routerMock = {
    navigate: jest.fn()
  };
  const activatedRouteMock = {
    queryParams: of()
  };
  const authServiceMock = {
    getUserAuth: jest.fn(() => {
      const user: User = {
        email: 'email',
        username: 'username',
        premium: false,
        firstname: 'John',
        lastname: 'Doe',
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
      declarations: [ MyCuttingComponent ],
      imports: [
        ReactiveFormsModule,
        NzFormModule,
      ],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized component with cuttings', () => {
    activatedRouteMock.queryParams.subscribe({
      next: (queryParams) => {
        expect(component.loading).toBe(false);
        expect(component.myCuttings).toEqual(cuttings);
      }
    });
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCuttingComponent } from './details-cutting.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { ParticipantService } from 'src/app/core/services/participant/participant.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserAuth } from 'src/app/shared/models/auth/auth';

describe('DetailsCuttingComponent', () => {
  let component: DetailsCuttingComponent;
  let fixture: ComponentFixture<DetailsCuttingComponent>;
  let cuttingServiceMock = {
    findOne: jest.fn(),
  };
  let authServiceMock = {
    getUserAuth: jest.fn(),
  };

  const messageServiceMock = {
    create: jest.fn(),
  };

  const participantServiceMock = {
    createWithRoom: jest.fn(),
  };

  const nzModalServiceMock = {
    confirm: jest.fn(),
    closeAll: jest.fn(),
  };
  console.error = jest.fn()

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NzGridModule],
      declarations: [DetailsCuttingComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) }},
        { provide: CuttingService, useValue: cuttingServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ParticipantService, useValue: participantServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: NzModalService, useValue: nzModalServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCuttingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const userAuth: UserAuth = {
      user: {
        id: 0,
        email: 'email@email.com',
        username: 'username',
        firstname: 'John',
        lastname: 'Doe',
      },
      token: 'token',
    };
    authServiceMock.getUserAuth.mockReturnValue(of(userAuth));
    // cuttingServiceMock.findOne.mockReturnValue(of());

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  // it('should initialized component with an user and a cutting', () => {

  //   const userAuth: UserAuth = {
  //     user: {
  //       id: 0,
  //       email: 'email@email.com',
  //       username: 'username',
  //     },
  //     token: 'token'
  //   };

  //   const cutting = new Cutting();
  //   cutting.id = 0;
  //   cutting.name = 'name';
  //   cutting.description = 'description';

  //   authServiceMock.getUserAuth.mockReturnValue(of(userAuth));
  //   cuttingServiceMock.findOne.mockReturnValue(of(cutting));

  //   fixture.detectChanges();

  //   expect(component.currentUser).toEqual(userAuth.user);
  //   expect(component.cutting).toEqual(cutting);
  // });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { ChatSocketService } from 'src/app/core/services/chat-socket/chat-socket.service';
import { AppService } from 'src/app/core/services/app/app.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { ReactiveFormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  const params = { id: '1' };
  const userServiceMock = {
    getTalkTo: jest.fn()
  };
  const chatSocketServiceMock = {
    init: jest.fn(),
    on: jest.fn(),
    disconnect: jest.fn()
  };
  const appServiceMock = {
    setFullHeigh: jest.fn()
  };
  const routerMock = {
    navigate: jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ChatComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of(params) } },
        { provide: UserService, useValue: userServiceMock },
        { provide: ChatSocketService, useValue: chatSocketServiceMock },
        { provide: AppService, useValue: appServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const user: User = {
      email: 'email',
      username: 'username',
      firstname: 'John',
      lastname: 'Doe',
    }
    userServiceMock.getTalkTo.mockReturnValue(of([user, user]))
    chatSocketServiceMock.init.mockReturnValue(of());
    chatSocketServiceMock.on.mockReturnValue(of());

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContentComponent } from './chat-content.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { ChatSocketService } from 'src/app/core/services/chat-socket/chat-socket.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAuth } from 'src/app/shared/models/auth/auth';

describe('ChatContentComponent', () => {
  let component: ChatContentComponent;
  let fixture: ComponentFixture<ChatContentComponent>;
  const params = { id: '1' };
  const authServiceMock = {
    getUserAuth: jest.fn()
  };
  const messageServiceMock = {
    findConversation: jest.fn()
  };
  const chatSocketServiceMock = {
    on: jest.fn(),
    emit: jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ChatContentComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of(params) } },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ChatSocketService, useValue: chatSocketServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContentComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const userAuth: UserAuth = {
      user: {
        id: 0,
        email: 'email@email.com',
        username: 'username',
      },
      token: 'token'
    };
    authServiceMock.getUserAuth.mockReturnValue(of(userAuth));
    // socketioServiceMock.emit.mockReturnValue();
    chatSocketServiceMock.on.mockReturnValue(of());

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageComponent } from './chat-message.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzGridModule],
      declarations: [ ChatMessageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    component.message = {
      message_content: '',
      createdAt: new Date(),
      enabled: true,
      id: 1,
      room: {
        id: 1,
        name: ''
      },
      user: {
        email: 'email',
        username: 'username'
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

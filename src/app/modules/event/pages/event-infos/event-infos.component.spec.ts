import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInfosComponent } from './event-infos.component';
import { EventService } from 'src/app/core/services/event/event.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EntryService } from 'src/app/core/services/entry/entry.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Event } from 'src/app/shared/models/event/event.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MockAuthService } from 'src/app/shared/mocks/auth.service.mock';

describe('EventInfosComponent', () => {
  let component: EventInfosComponent;
  let fixture: ComponentFixture<EventInfosComponent>;
  const params = { id: '1' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NzGridModule,
        NzTableModule,
        NzAlertModule,
        NzModalModule,
        RouterModule,
      ],
      declarations: [EventInfosComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService, },
        EventService,
        EntryService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        },
        { provide: ActivatedRoute, useValue: { params: of(params) } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should determines if the event is finished', () => {
    component.event = new Event("Test name 1",
      "Test description 1.",
      "23 Test street",
      new Date(),
      new Date(1990, 1),
      0, 10, 43.656653, 4.21212, false, 1,
    );
    expect(component.isEventFinished()).toBe(true);

    component.event.endDate = new Date(2100, 1);
    expect(component.isEventFinished()).toBe(false);
  });
});

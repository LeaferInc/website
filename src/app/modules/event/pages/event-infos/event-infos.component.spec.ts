import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInfosComponent } from './event-infos.component';
import { EventService } from 'src/app/core/services/event/event.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EntryService } from 'src/app/core/services/entry/entry.service';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('EventInfosComponent', () => {
  let component: EventInfosComponent;
  let fixture: ComponentFixture<EventInfosComponent>;
  const params = { id: '1' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NzGridModule,],
      declarations: [EventInfosComponent],
      providers: [
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
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSearchComponent, SearchType } from './events-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from 'src/app/core/services/event/event.service';
import { MockEventService } from 'src/app/shared/mocks/event.service.mock';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EventsSearchComponent', () => {
  const data = {
    searchType: SearchType.DATE
  };
  let component: EventsSearchComponent;
  let fixture: ComponentFixture<EventsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NzFormModule,
        NzGridModule,
        NzInputModule,
      ],
      declarations: [EventsSearchComponent],
      providers: [
        { provide: EventService, useClass: MockEventService },
        { provide: UtilsService, useValue: '' },
        { provide: ActivatedRoute, useValue: { data: of(data) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with date', () => {
    expect(component).toBeTruthy();
    expect(component.isDateSearch()).toBe(true);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { ResultData } from 'src/app/shared/models/query/query';
import { of } from 'rxjs/internal/observable/of';
import { Event } from 'src/app/shared/models/event/event.model';
import { NzTableModule } from 'ng-zorro-antd/table';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  const eventServiceMock = {
    getEvents: jest.fn(() => {
      return of([]);
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListComponent ],
      imports: [ NzTableModule ],
      providers: [
        { provide: EventService , useValue: eventServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

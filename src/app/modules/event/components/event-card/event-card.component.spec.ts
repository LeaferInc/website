import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';
import { Event } from '../../../../shared/models/event/event.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EventCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.event = new Event("Test name 1", "Test description 1.", "23 Test street", new Date(), new Date(), 0, 10, 43.656653, 4.21212, false, 1);
    expect(component).toBeTruthy();
  });
});

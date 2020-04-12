/**
 * @author ddaninthe
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventService } from 'src/app/event/event.service';
import {Event} from 'src/app/event/event.model';
import { of } from 'rxjs';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  let events = [
      new Event("Test name 1", "Test description 1.", 
      "23 Test street", new Date(), new Date(), 0, 10, 43.656653, 4.21212)]

  const mockEventService = {
    getEvents: jest.fn(() => of(events))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventComponent],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

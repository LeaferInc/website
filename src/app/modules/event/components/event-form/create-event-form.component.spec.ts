import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EventFormComponent } from './create-event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from 'src/app/shared/models/location/location.model';
import { EventService } from 'src/app/core/services/event/event.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Router } from '@angular/router';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [EventFormComponent],
      providers: [
        EventService, 
        UtilsService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set location to the form', () => {
    const location: Location = new Location('168, rue de la Myrtille', 48.2112, 4.96012);
    component.setFormLocation(location);
    expect(component.locationChoosed).toBe(location);
    expect(component.locations).toHaveLength(0);
    expect(component.eventForm.get('location').value).toBe('168, rue de la Myrtille');
    expect(component.eventForm.get('latitude').value).toBe(48.2112);
    expect(component.eventForm.get('longitude').value).toBe(4.96012);
  });
});

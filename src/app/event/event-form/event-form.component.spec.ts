import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EventFormComponent } from './event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../event.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UtilsService } from 'src/app/common/utils.service';
import { Location } from 'src/app/common/location.model';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [EventFormComponent],
      providers: [EventService, UtilsService],
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

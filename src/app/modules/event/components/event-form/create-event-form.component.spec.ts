import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EventFormComponent } from './create-event-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Router } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { MockEventService } from 'src/app/shared/mocks/event.service.mock';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { NzMessageModule } from 'ng-zorro-antd/message';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NzGridModule,
        NzInputModule,
        NzMessageModule,
        NzAutocompleteModule,
        NzInputNumberModule,
        ImagePickerModule,
      ],
      declarations: [EventFormComponent],
      providers: [
        { provide: EventService, useClass: MockEventService },
        UtilsService,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
});


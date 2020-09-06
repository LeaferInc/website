import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { of } from 'rxjs';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  const adminServiceMock = {
    getStatistics: jest.fn(() => of())
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent ],
      providers: [
        { provide: AdminService, useValue: adminServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

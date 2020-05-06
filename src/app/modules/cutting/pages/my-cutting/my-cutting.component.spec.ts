import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCuttingComponent } from './my-cutting.component';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('MyCuttingComponent', () => {
  let component: MyCuttingComponent;
  let fixture: ComponentFixture<MyCuttingComponent>;
  let cuttingServiceMock = {
    findAllByUser: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCuttingComponent ],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCuttingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized component with cuttings', () => {
    const cuttings = [new Cutting(), new Cutting()];

    cuttingServiceMock.findAllByUser.mockReturnValue(of(cuttings));

    fixture.detectChanges();
    
    expect(component.loading).toBe(false);
    expect(component.myCuttings).toEqual(cuttings);
  });
});

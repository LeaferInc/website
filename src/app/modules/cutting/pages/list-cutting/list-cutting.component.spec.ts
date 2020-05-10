import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuttingComponent } from './list-cutting.component';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ListCuttingComponent', () => {
  let component: ListCuttingComponent;
  let fixture: ComponentFixture<ListCuttingComponent>;
  let cuttingServiceMock = {
    findAllExchange: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ListCuttingComponent ],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuttingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized componennt with cuttings', () => {
    const cuttings = [new Cutting(), new Cutting()];

    cuttingServiceMock.findAllExchange.mockReturnValue(of(cuttings));

    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.cuttings).toEqual(cuttings);
  });

});

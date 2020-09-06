import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuttingComponent } from './list-cutting.component';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';

describe('ListCuttingComponent', () => {
  let component: ListCuttingComponent;
  let fixture: ComponentFixture<ListCuttingComponent>;
  const cuttingServiceMock = {
    findAllExchange: jest.fn()
  };
  const routerMock = {
    navigate: jest.fn()
  };
  const activatedRouteMock = {
    queryParams: of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NzFormModule,
      ],
      declarations: [ ListCuttingComponent ],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
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

    activatedRouteMock.queryParams.subscribe({
      next: (queryParam) => {
        expect(component.loading).toBe(false);
        expect(component.cuttings).toEqual(cuttings);
      }
    })
  });

});

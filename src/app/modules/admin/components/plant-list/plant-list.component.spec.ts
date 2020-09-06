import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantListComponent } from './plant-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant/plant';
import { ResultData } from 'src/app/shared/models/query/query';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { of } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  const plantServiceMock = {
    findAll: jest.fn(() => {
      const resultData = new ResultData<Plant>();
      resultData.items = [];
      resultData.count = 0;
      return of(resultData);
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantListComponent ],
      imports: [ NzTableModule, NzTypographyModule ],
      providers: [
        { provide: PlantService, useValue: plantServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

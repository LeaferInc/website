import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlantComponent } from './list-plant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('ListPlantComponent', () => {
  let component: ListPlantComponent;
  let fixture: ComponentFixture<ListPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NzGridModule
      ],
      declarations: [ ListPlantComponent ],
      providers: [
        { provide: PlantService, useValue: {} },
        { provide: ActivatedRoute, useValue: {queryParams: of({ page: 1 })} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

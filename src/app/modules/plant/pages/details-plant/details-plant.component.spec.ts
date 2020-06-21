import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlantComponent } from './details-plant.component';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { PlantCollectionService } from 'src/app/core/services/plant-collection/plant-collection.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DetailsPlantComponent', () => {
  let component: DetailsPlantComponent;
  let fixture: ComponentFixture<DetailsPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlantComponent ],
      providers: [
        { provide: PlantService, useValue: {} },
        { provide: PlantCollectionService, useValue: {} },
        { provide: ActivatedRoute, useValue: {params: of({ id: 1 })} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

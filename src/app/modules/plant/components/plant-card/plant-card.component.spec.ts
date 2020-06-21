import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCardComponent } from './plant-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant/plant';

describe('PlantCardComponent', () => {
  let component: PlantCardComponent;
  let fixture: ComponentFixture<PlantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantCardComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantCardComponent);
    component = fixture.componentInstance;
    const plant = new Plant();
    plant.id = 1;
    plant.name = 'plantName';
    component.plant = plant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

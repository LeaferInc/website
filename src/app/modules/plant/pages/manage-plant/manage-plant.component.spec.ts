import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlantComponent } from './manage-plant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ManagePlantComponent', () => {
  let component: ManagePlantComponent;
  let fixture: ComponentFixture<ManagePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NzGridModule
      ],
      declarations: [ ManagePlantComponent ],
      providers: [
        { provide: PlantService, useValue: {} },
        { provide: ActivatedRoute, useValue: {queryParams: of({ page: 1 })} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

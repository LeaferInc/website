import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPlantComponent } from './community-plant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('CommunityPlantComponent', () => {
  let component: CommunityPlantComponent;
  let fixture: ComponentFixture<CommunityPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NzGridModule
      ],
      declarations: [ CommunityPlantComponent ],
      providers: [
        { provide: PlantService, useValue: {} },
        { provide: ActivatedRoute, useValue: {queryParams: of({ page: 1 })} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

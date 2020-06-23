import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGardenComponent } from './my-garden.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MyGardenComponent', () => {
  let component: MyGardenComponent;
  let fixture: ComponentFixture<MyGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NzGridModule
      ],
      declarations: [ MyGardenComponent ],
      providers: [
        { provide: PlantService, useValue: {} },
        { provide: ActivatedRoute, useValue: {queryParams: of({ page: 1 })} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

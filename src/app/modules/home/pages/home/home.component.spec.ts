/**
 * @author ddaninthe
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const cuttingServiceMock = {
    findAllExchange: jest.fn(() => of())
  };
  const plantServiceMock = {
    findAllExceptOwner: jest.fn(() => of())
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NzGridModule,
        NzCardModule,
        NzTypographyModule
      ],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock },
        { provide: PlantService, useValue: plantServiceMock }
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlantComponent } from './create-plant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePlantComponent', () => {
  let component: CreatePlantComponent;
  let fixture: ComponentFixture<CreatePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NzFormModule,
        NzRadioModule,
        NzButtonModule,
        NzInputNumberModule,
        NzSelectModule,
      ],
      declarations: [ CreatePlantComponent ],
      providers: [
        { provide: PlantService, useValue: {} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

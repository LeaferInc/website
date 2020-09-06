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
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

describe('CreatePlantComponent', () => {
  let component: CreatePlantComponent;
  let fixture: ComponentFixture<CreatePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NzFormModule,
        NzRadioModule,
        NzButtonModule,
        NzMessageModule,
        NzInputNumberModule,
        NzSelectModule,
        ImagePickerModule,
      ],
      declarations: [CreatePlantComponent],
      providers: [
        { provide: PlantService, useValue: {} },
        { provide: NzMessageService, useValue: { error: jest.fn() } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

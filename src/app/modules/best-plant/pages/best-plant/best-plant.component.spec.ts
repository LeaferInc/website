import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPlantComponent } from './best-plant.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BestPlantService } from 'src/app/core/services/best-plant/best-plant.service';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

describe('BestPlantComponent', () => {
  let component: BestPlantComponent;
  let fixture: ComponentFixture<BestPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        NzGridModule,
        NzInputNumberModule,
        NzInputModule,
        NzSelectModule,
        NzMessageModule,
        NzSwitchModule,
        NzButtonModule,
      ],
      declarations: [BestPlantComponent],
      providers: [{ provide: BestPlantService, useValue: {}, }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

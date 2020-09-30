import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionComponent } from './recognition.component';
import { RecognitionService } from 'src/app/core/services/recognition/recognition.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecognitionComponent', () => {
  let component: RecognitionComponent;
  let fixture: ComponentFixture<RecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        NzGridModule,
        NzInputModule,
        NzSelectModule,
        NzMessageModule,
        NzButtonModule,
        ImagePickerModule,
      ],
      declarations: [RecognitionComponent],
      providers: [{ provide: RecognitionService, useValue: {}, }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

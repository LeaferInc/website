import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuttingComponent } from './create-cutting.component';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';

describe('CreateCuttingComponent', () => {
  let component: CreateCuttingComponent;
  let fixture: ComponentFixture<CreateCuttingComponent>;
  const cuttingServiceMock = {
    create: jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NzGridModule,
        NzButtonModule,
        NzMessageModule,
        ImagePickerModule,
      ],
      declarations: [CreateCuttingComponent],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: NzMessageService, useValue: { error: jest.fn() } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mockToBase64 = jest.fn((file) => file);
    UtilsService.toBase64 = mockToBase64;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a cutting', async () => {
    cuttingServiceMock.create.mockReturnValue(of());

    const cutting = new Cutting();
    cutting.name = 'name';
    cutting.description = 'description';
    cutting.tradeWith = 'nothing';

    let obj: any = 'picture_placeholder';
    component.newImage = obj;
    UtilsService.toBase64 = jest.fn();

    component.createCuttingForm.get('nameInput').setValue('name');
    component.createCuttingForm.get('descriptionInput').setValue('description');
    component.createCuttingForm.get('tradeWithInput').setValue('nothing');
    await component.onSubmit();

    expect(cuttingServiceMock.create).toHaveBeenCalledWith(cutting);
  });
});

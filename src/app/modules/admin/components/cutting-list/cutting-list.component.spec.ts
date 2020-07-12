import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CuttingListComponent } from './cutting-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { ResultData } from 'src/app/shared/models/query/query';
import { of } from 'rxjs';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { NzTableModule } from 'ng-zorro-antd/table';

describe('CuttingListComponent', () => {
  let component: CuttingListComponent;
  let fixture: ComponentFixture<CuttingListComponent>;
  const cuttingServiceMock = {
    findAll: jest.fn(() => {
      const resultData = new ResultData<Cutting>();
      resultData.items = [];
      resultData.count = 0;
      return of(resultData);
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuttingListComponent ],
      imports: [
        NzTableModule
      ],
      providers: [
        { provide: CuttingService , useValue: cuttingServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuttingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

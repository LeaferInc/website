import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuttingComponent } from './create-cutting.component';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateCuttingComponent', () => {
  let component: CreateCuttingComponent;
  let fixture: ComponentFixture<CreateCuttingComponent>;
  const cuttingServiceMock = {
    create: jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ CreateCuttingComponent ],
      providers: [
        { provide: CuttingService, useValue: cuttingServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a cutting', () => {
    cuttingServiceMock.create.mockReturnValue(of());

    const cutting = new Cutting();
    cutting.name = 'name';
    cutting.description = 'description';
    cutting.tradeWith = 'nothing';

    component.nameInput.setValue('name');
    component.descriptionInput.setValue('description');
    component.tradeWithInput.setValue('nothing');

    component.onSubmit();

    expect(cuttingServiceMock.create).toHaveBeenCalledWith(cutting);
  });
});

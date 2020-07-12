import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuttingCardComponent } from './list-cutting-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

describe('ListCuttingCardComponent', () => {
  let component: ListCuttingCardComponent;
  let fixture: ComponentFixture<ListCuttingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NzCardModule, NzDropDownModule ],
      providers: [
        { provide: NzContextMenuService, useValue: {} },
        { provide: CuttingService, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
      declarations: [ ListCuttingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuttingCardComponent);
    component = fixture.componentInstance;
    
    const cutting = new Cutting();
    cutting.id = 0;
    cutting.name = 'name';
    cutting.description = 'description';
    component.cutting = cutting;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

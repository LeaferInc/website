import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuttingCardComponent } from './list-cutting-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { NzCardModule } from 'ng-zorro-antd/card';

describe('ListCuttingCardComponent', () => {
  let component: ListCuttingCardComponent;
  let fixture: ComponentFixture<ListCuttingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, NzCardModule ],
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

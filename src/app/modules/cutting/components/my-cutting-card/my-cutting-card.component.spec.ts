import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCuttingCardComponent } from './my-cutting-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

describe('MyCuttingCardComponent', () => {
  let component: MyCuttingCardComponent;
  let fixture: ComponentFixture<MyCuttingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ MyCuttingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCuttingCardComponent);
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

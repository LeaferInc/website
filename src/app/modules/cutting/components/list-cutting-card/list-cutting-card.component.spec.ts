import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuttingCardComponent } from './list-cutting-card.component';

describe('ListCuttingCardComponent', () => {
  let component: ListCuttingCardComponent;
  let fixture: ComponentFixture<ListCuttingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCuttingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuttingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

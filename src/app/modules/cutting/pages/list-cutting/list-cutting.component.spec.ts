import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuttingComponent } from './list-cutting.component';

describe('ListCuttingComponent', () => {
  let component: ListCuttingComponent;
  let fixture: ComponentFixture<ListCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

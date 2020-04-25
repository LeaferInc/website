import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuttingComponent } from './create-cutting.component';

describe('CreateCuttingComponent', () => {
  let component: CreateCuttingComponent;
  let fixture: ComponentFixture<CreateCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCuttingComponent ]
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
});

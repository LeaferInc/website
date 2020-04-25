import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCuttingComponent } from './details-cutting.component';

describe('DetailsCuttingComponent', () => {
  let component: DetailsCuttingComponent;
  let fixture: ComponentFixture<DetailsCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

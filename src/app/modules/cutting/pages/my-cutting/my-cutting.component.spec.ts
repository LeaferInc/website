import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCuttingComponent } from './my-cutting.component';

describe('MyCuttingComponent', () => {
  let component: MyCuttingComponent;
  let fixture: ComponentFixture<MyCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

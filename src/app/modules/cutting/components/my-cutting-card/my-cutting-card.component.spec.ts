import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCuttingCardComponent } from './my-cutting-card.component';

describe('MyCuttingCardComponent', () => {
  let component: MyCuttingCardComponent;
  let fixture: ComponentFixture<MyCuttingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCuttingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCuttingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

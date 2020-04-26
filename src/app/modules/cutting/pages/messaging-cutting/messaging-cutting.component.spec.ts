import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingCuttingComponent } from './messaging-cutting.component';

describe('MessagingCuttingComponent', () => {
  let component: MessagingCuttingComponent;
  let fixture: ComponentFixture<MessagingCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingCuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

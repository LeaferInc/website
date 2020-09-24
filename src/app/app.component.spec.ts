import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NotificationService } from './core/services/notification/notification.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

describe('AppComponent', () => {
  const authServiceMock = {
    getUserFromToken: jest.fn()
  };
  const notificationServiceMock = {
    findNotificationByUser: jest.fn()
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NzMenuModule,
        NzDropDownModule,
      ],
      providers: [ 
        { provide: AuthService, useValue: authServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Leafer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Leafer');
  }); 
});

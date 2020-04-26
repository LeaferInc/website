import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCuttingComponent } from './details-cutting.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

describe('DetailsCuttingComponent', () => {
  let component: DetailsCuttingComponent;
  let fixture: ComponentFixture<DetailsCuttingComponent>;
  let cuttingServiceMock = {
    findOne: jest.fn()
  };
  let authServiceMock = {
    getUserAuth: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCuttingComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: of({params: {id: 1}}) },
        { provide: CuttingService, useValue: cuttingServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCuttingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialized component with an user and a cutting', () => {
    
  //   const userAuth: UserAuth = {
  //     user: {
  //       id: 0,
  //       email: 'email@email.com',
  //       username: 'username',
  //     },
  //     token: 'token'
  //   };

  //   const cutting = new Cutting();
  //   cutting.id = 0;
  //   cutting.name = 'name';
  //   cutting.description = 'description';

  //   authServiceMock.getUserAuth.mockReturnValue(of(userAuth));
  //   cuttingServiceMock.findOne.mockReturnValue(of(cutting));

  //   fixture.detectChanges();

  //   expect(component.currentUser).toEqual(userAuth.user);
  //   expect(component.cutting).toEqual(cutting);
  // });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { ResultData } from 'src/app/shared/models/query/query';
import { UserService } from 'src/app/core/services/user/user.service';
import { of } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const userServiceMock = {
    getAll: jest.fn(() => {
      const resultData = new ResultData<User>();
      resultData.items = [];
      resultData.count = 0;
      return of(resultData);
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [ NzTableModule ],
      providers: [
        { provide: UserService , useValue: userServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

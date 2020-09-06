import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UserService } from 'src/app/core/services/user/user.service';
import { MockUserService } from 'src/app/shared/mocks/user.service.mock';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const params = { id: '1' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NzGridModule,],
      declarations: [ProfileComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        },
        { provide: ActivatedRoute, useValue: { params: of(params) } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

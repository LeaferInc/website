import { TestBed } from '@angular/core/testing';
import { PlantService } from './plant.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlantService', () => {
  let service: PlantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { PlantCollectionService } from './plant-collection.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlantCollectionService', () => {
  let service: PlantCollectionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlantCollectionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

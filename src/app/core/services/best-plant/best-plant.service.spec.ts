import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BestPlantService } from './best-plant.service';

describe('BestPlantService', () => {
  let service: BestPlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BestPlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

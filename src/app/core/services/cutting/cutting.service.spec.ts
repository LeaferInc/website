import { TestBed } from '@angular/core/testing';

import { CuttingService } from './cutting.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

describe('CuttingService', () => {
  let service: CuttingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CuttingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a cutting', () => {
    const cutting: Cutting = new Cutting();
    cutting.name = 'name';
    cutting.description = 'description';

    service.create(cutting).subscribe((e: Cutting) => {
      expect(e).toBeTruthy();
      expect(e).toEqual(cutting);
    });

    const req: TestRequest = httpMock.expectOne(CuttingService.USER_URL);
    req.flush(cutting);
    expect(req.request.method).toBe('POST');

    httpMock.verify();
  });
});

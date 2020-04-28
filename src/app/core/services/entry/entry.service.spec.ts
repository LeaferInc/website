import { TestBed } from '@angular/core/testing';

import { EntryService } from './entry.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EntryService', () => {
  let service: EntryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntryService]
    });
    service = TestBed.inject(EntryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

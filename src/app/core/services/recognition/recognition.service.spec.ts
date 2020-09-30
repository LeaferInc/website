import { TestBed } from '@angular/core/testing';

import { RecognitionService } from './recognition.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecognitionService', () => {
  let service: RecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

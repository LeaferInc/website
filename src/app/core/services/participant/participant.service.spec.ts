import { TestBed } from '@angular/core/testing';

import { ParticipantService } from './participant.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ParticipantService', () => {
  let service: ParticipantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ParticipantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SensorDataSocketService } from './sensor-data-socket.service';

describe('SensorDataSocketService', () => {
  let service: SensorDataSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorDataSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

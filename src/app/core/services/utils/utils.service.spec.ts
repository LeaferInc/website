/**
 * @author ddaninthe
 */

import { UtilsService } from './utils.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Location } from 'src/app/shared/models/location/location.model';

describe('Utils testing', () => {
  it('should return a JSON date with locale', () => {
    let date: Date = new Date(2020, 1, 10, 12);
    expect(UtilsService.dateToJSONLocal(date)).toBe('2020-02-10T12:00:00.000Z');
    date = new Date(2020, 11, 10, 23);
    expect(UtilsService.dateToJSONLocal(date)).toBe('2020-12-10T23:00:00.000Z');
    date = new Date(2021, 0, 1, 0);
    expect(UtilsService.dateToJSONLocal(date)).toBe('2021-01-01T00:00:00.000Z');
  });
});

describe('UtilsService', () => {
  let service: UtilsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilsService]
    });
    service = TestBed.inject(UtilsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Location', () => {
    const response = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.432068,
          48.940791
        ]
      },
      "properties": {
        "label": "Rue de l'Abb\u00e9 Niort 93150 Le Blanc-Mesnil",
        "score": 0.5251248330647035,
        "id": "93007_0020",
        "type": "street",
        "x": 658396.42,
        "y": 6871351.94,
        "importance": 0.5263731637117387,
        "name": "Rue de l'Abb\u00e9 Niort",
        "postcode": "93150",
        "citycode": "93007",
        "city": "Le Blanc-Mesnil",
        "context": "93, Seine-Saint-Denis, \u00cele-de-France"
      }
    }

    service.getLocations("23 rue de l'abbé niort").subscribe((locs: Location[]) => {
      expect(locs).toHaveLength(1);
      expect(locs[0].label).toBe("Rue de l'Abbé Niort 93150 Le Blanc-Mesnil");
      expect(locs[0].lat).toBe(48.940791);
      expect(locs[0].long).toBe(2.432068);
    });

    const req: TestRequest = httpMock.expectOne(UtilsService.ADDRESS_API_URL + "23%20rue%20de%20l'abb%C3%A9%20niort");
    req.flush(response);
    expect(req.request.method).toBe('GET');

    httpMock.verify();
  });
});

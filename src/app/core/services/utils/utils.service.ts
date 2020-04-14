
/**
 * This class provides utility functions and API calls
 * @author ddaninthe
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from 'src/app/shared/models/location/location.model';
import { map } from 'rxjs/operators';

@Injectable()
export class UtilsService {
  static readonly ADDRESS_API_URL: string = "location?address=";

  constructor(private httpClient: HttpClient) { }

  /**
   * This function gives locations data of the `address` parameter through an external API
   * @param address the address to search for
   */
  getLocations(address: string): Observable<Location[]> {
    return this.httpClient.get('location?address='.concat(address))
      .pipe(map((res: Response) => 
        res["features"].map((item) => Location.mapFromJson(item))));
  }

  /**
   * Return a localized JSON Date
   * @param date the {@link Date} to convert
   */
  static dateToJSONLocal(date: Date): string {
    const d: Date = new Date(date);
    d.setMinutes(d.getMinutes() - date.getTimezoneOffset())
    return d.toJSON();
  }
}
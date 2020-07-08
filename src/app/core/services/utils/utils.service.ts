
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
   * Get navigator's current location
   */
  getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos: Position) => {
        return resolve(new Location('Current place', pos.coords.latitude, pos.coords.longitude));
      }),
        (err: PositionError) => {
          return reject(err);
        };
    });
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

  /**
   * Encodes an image to a base64 string
   * @param file the file to encode
   */
  static toBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString().split("base64,")[1]);
      reader.onerror = error => reject(error);
    });
  }
}
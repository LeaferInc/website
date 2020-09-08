import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecognitionSearch, RecognitionResult } from 'src/app/shared/models/recognition/recognition';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  static readonly BASE_URL = 'recognize';

  constructor(private http: HttpClient) { }

  /**
   * Identifies a plant
   * @param recognition the recognition parameters
   */
  identifyPlant(recognition: RecognitionSearch): Observable<RecognitionResult> {
    return this.http.post<RecognitionResult>(RecognitionService.BASE_URL, recognition);
  }
}

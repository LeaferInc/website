import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/shared/models/participant/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  static readonly PARTICIPANT_URL = 'participant';

  constructor(private http: HttpClient) { }

}

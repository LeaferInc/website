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

  create(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(ParticipantService.PARTICIPANT_URL, participant);
  }

  createWithRoom(...usersId): Observable<unknown> {
    return this.http.post<unknown>(`${ParticipantService.PARTICIPANT_URL}/withRoom`, usersId);
  }
}

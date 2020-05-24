import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from 'src/app/shared/models/room/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  static readonly ROOM_URL = 'room';

  constructor(private http: HttpClient) { }
  
}

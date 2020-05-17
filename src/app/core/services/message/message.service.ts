import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message, CreateMessage, CreateDiscussion } from 'src/app/shared/models/message/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  static readonly MESSAGE_URL = 'message';

  constructor(private http: HttpClient) { }

  create(message: CreateMessage): Observable<Message> {
    return this.http.post<Message>(MessageService.MESSAGE_URL, message);
  }

  createDiscussion(message: CreateDiscussion): Observable<Message> {
    return this.http.post<Message>(`${MessageService.MESSAGE_URL}/createDiscussion`, message);
  }

  findConversation(roomId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${MessageService.MESSAGE_URL}/conversation`, {
      params: { roomId: String(roomId) }
    });
  }
} 

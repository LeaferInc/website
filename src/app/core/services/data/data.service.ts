import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public static readonly SERVER_URL: string = "http://localhost:3000/";

  readonly headers: HttpHeaders;

  constructor() {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', DataService.SERVER_URL);
    //this.headers.append('Authorization', <AUTH_TOKEN>);
   }
}

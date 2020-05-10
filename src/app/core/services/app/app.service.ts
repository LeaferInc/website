import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private fullHeight = new BehaviorSubject<boolean>(false);

  public setFullHeigh(bool: boolean) {
    this.fullHeight.next(bool);
  }

  public get currentFullHeight() : Observable<boolean> {
    return this.fullHeight.asObservable();
  }
  
  constructor() { }

}

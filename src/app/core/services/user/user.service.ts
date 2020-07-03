import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserEdit } from 'src/app/shared/models/user/user';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/shared/models/query/query';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly USER_URL = 'user';

  constructor(private http: HttpClient) { }

  create(user: User, password: string): Observable<User> {
    return this.http.post<User>(UserService.USER_URL, {...user, ...{password: password}});
  }

  getTalkTo(): Observable<User[]> {
    return this.http.get<User[]>(`${UserService.USER_URL}/talkto`);
  }

  /**
   * Updates current user
   */
  updateProfile(changes: UserEdit): Observable<User> {
    return this.http.put<User>(UserService.USER_URL, changes);
  }

  /**
   * Deletes current user
   */
  deleteAccount(): Observable<void> {
    return this.http.delete<void>(UserService.USER_URL);
  }
  
  getAll(skip?: number, take?: number): Observable<ResultData<User>> {
    return this.http.get<ResultData<User>>(`${UserService.USER_URL}/all`, {
      params: {
        skip: String(skip),
        take: String(take)
      }
    });
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${UserService.USER_URL}/${id}`);
  }
}

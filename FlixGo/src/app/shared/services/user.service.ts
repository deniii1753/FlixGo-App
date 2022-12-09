import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    ) { }

  getUserInfo(userId: string, token: string) {
    const headers = new HttpHeaders({
      'X-Auth-Token': token
    });

    return this.http.get<IUser>(`/api/users/${userId}`, {headers});
  }
}

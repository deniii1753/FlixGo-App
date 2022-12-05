import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: IUser | null = null;

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  constructor(private http: HttpClient) { }

  register(data: Object) {
    return this.http.post('/api/auth/register', data);
  }

  login(data: Object) {
    return this.http.post('/api/auth/login', data);
  }
}

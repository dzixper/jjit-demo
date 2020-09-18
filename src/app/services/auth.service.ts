import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // API_KEY = 'AIzaSyC8dzoGlESBFpTiA8Uzmj1ULy_YhmyR6mk';
  // user = new Subject<User>();

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(this._loginUrl, credentials);
  }

  signUp(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(this._registerUrl, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  private _formUrl = 'http://localhost:3000/api/post-offer-form';
  verifyToken(): any {
    return this.http.get<any>(this._formUrl);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = `https://yeet-demo.herokuapp.com/api/register`;
  private _loginUrl = `https://yeet-demo.herokuapp.com/api/login`;
  private _formUrl = `https://yeet-demo.herokuapp.com/api/post-offer-form`;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this._loginUrl, credentials);
  }

  signUp(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this._registerUrl, credentials);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  getToken(): any {
    return this.cookieService.get('token');
  }

  verifyToken(): Observable<any> {
    return this.http.get<any>(this._formUrl);
  }

  async isTokenVerified(): Promise<any> {
    return await this.verifyToken().toPromise();
  }
}

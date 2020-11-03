import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private PORT = 3000;
  private _registerUrl = `http://yeet-demo.herokuapp.com/api/register`;
  // private _registerUrl = `http://localhost:${this.PORT}/api/register`;
  private _loginUrl = `http://yeet-demo.herokuapp.com/api/login`;
  // private _loginUrl = `http://localhost:${this.PORT}/api/login`;
  private _formUrl = `http://yeet-demo.herokuapp.com/api/post-offer-form`;
  // private _formUrl = `http://localhost:${this.PORT}/api/post-offer-form`;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this._loginUrl, credentials);
  }

  signUp(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this._registerUrl, credentials);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
    // return !!localStorage.getItem('token');
    // return document.cookie === 'token';
  }

  getToken(): any {
    return this.cookieService.get('token');
  }

  verifyToken(): any { // Observable<HttpResponse<string>>
    return this.http.get<any>(this._formUrl);
  }

  async isTokenVerified(): Promise<any> {
    return await this.verifyToken().toPromise();
  }
}

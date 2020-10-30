import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoginMode = true;
  alertErrorColor = '#ff6666';
  alertSuccessColor = '#00d10f';
  alert = {
    show: false,
    text: 'There was an error!',
    color: this.alertErrorColor
  };

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  onSubmit(credentials: { email: string; password: string }): void {
    this.isLoginMode ? this.login(credentials) : this.signUp(credentials);
  }

  signUp(credentials: { email: string; password: string }): void {
    this.authService.signUp(credentials).subscribe(
      (res) => {
        // document.cookie = `token=${res.token}`;
        // localStorage.setItem('token', res.token);
        this.alert.text = 'Success! Now you can log in';
        this.alert.color = this.alertSuccessColor;
        this.alert.show = true;
        this.cookieService.set('token', res.token);
      },
      (err) => {
        this.alert.text = err.error;
        this.alert.color = this.alertErrorColor;
        this.alert.show = true;
      }
    );
  }

  login(credentials: { email: string; password: string }): void {
    this.authService.login(credentials).subscribe(
      (res) => {
        // localStorage.setItem('token', res.token);
        // document.cookie = `token=${res.token}`;
        this.alert.show = false;
        this.cookieService.set('token', res.token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.alert.text = err.error;
        this.alert.color = this.alertErrorColor;
        this.alert.show = true;
      }
    );
  }
}

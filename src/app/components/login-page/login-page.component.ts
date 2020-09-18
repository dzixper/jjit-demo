import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoginMode = true;
  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(credentials: {email: string, password: string}): void {
    console.log(credentials);
    if (this.isLoginMode) {
      this.authService.login(credentials).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        (err) => console.log(err)
      );
    } else {
      this.authService.signUp(credentials).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
        },
        (err) => console.log(err)
      );
    }
  }
}

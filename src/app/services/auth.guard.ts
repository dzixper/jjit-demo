import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    if (this.authService.isLoggedIn()) { // && this.authService.isTokenVerified()
      try {
        const result = await this.authService.isTokenVerified();
        console.log(result);
        return result.valid;
      } catch (e) {
        console.log(e);
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

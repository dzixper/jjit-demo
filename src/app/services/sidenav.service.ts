import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav: MatSidenav;

  public toggle(): void {
    this.sidenav.toggle();
  }

  public setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  constructor() {
  }

}

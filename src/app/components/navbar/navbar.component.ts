import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  sidenavToggle(): void {
    this.sidenavService.toggle();
  }
}

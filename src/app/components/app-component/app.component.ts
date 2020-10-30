import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { SIDENAVBUTTONS } from '../../shared/sidenav-buttons';
import { SidenavButton } from '../../shared/models/sidenav-button.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tylkotudola.cz';
  sidenavButtons: Array<SidenavButton> = SIDENAVBUTTONS;

  @ViewChild('sidenavigation', {static: true}) public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService, public router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.sidenavService.setSidenav(this.sidenav);
  }


}

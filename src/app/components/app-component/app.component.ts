import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tylkotudola.cz';

  sidenavButtons: Array<object> = [
    {icon: 'work', text: 'Employer Panel'},
    {icon: 'portrait', text: 'JustJoinIT'},
    {icon: 'people', text: 'About Us'},
    {icon: 'mic', text: 'Event'},
    {icon: 'fiber_manual_record', text: 'Recruitment'},
    {icon: 'bar_chart', text: 'IT Index'},
    {icon: 'rss_feed', text: 'RSS'},
    {icon: 'picture_as_pdf', text: 'Terms'},
    {icon: 'picture_as_pdf', text: 'Policy'}
  ];

  @ViewChild('sidenavigation', {static: true}) public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }


}

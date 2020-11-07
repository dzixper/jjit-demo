import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { TECHNOLOGIES } from '../../shared/technologies';
import { LOCATIONS } from '../../shared/locations';
import { Technology } from '../../shared/models/technology.model';
import { Location } from '../../shared/models/location.model';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { convertEveryTechnologyToGrayscale } from '../../utils/shared-functions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  technologies: Array<Technology> = TECHNOLOGIES;
  locations: Array<Location> = LOCATIONS;

  @ViewChild('techmenu') techMenu: MatMenu;

  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(): void {
    this.dialog.open(FilterOptionsComponent);
  }

  ngOnInit(): void {}

  onTechnologyButtonClick(techName: string, id: number): void {
    this.setQueryParameter(techName);
    convertEveryTechnologyToGrayscale(id);
  }

  setQueryParameter(techName: string): void {
    if (techName === 'all') {
      this.router.navigate([]);
    } else {
      this.router.navigate([], { queryParams: { technology: techName } });
    }
  }
}

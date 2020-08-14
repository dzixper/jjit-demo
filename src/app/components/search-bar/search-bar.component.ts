import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { TECHNOLOGIES } from '../../shared/technologies';
import { LOCATIONS } from '../../shared/locations';
import { Technology } from '../../shared/models/technology.model';
import { Location } from '../../shared/models/location.model';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  // TODO => tutaj serwisem czy tak na chama?
  technologies: Array<Technology> = TECHNOLOGIES;
  locations: Array<Location> = LOCATIONS;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterOptionsComponent);

    // TODO => to do backendu bedzie przydatne
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  ngOnInit(): void {
  }

}

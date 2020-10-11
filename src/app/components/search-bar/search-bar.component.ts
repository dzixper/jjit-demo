import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { TECHNOLOGIES } from '../../shared/technologies';
import { LOCATIONS } from '../../shared/locations';
import { Technology } from '../../shared/models/technology.model';
import { Location } from '../../shared/models/location.model';
import { MatMenu } from '@angular/material/menu';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  technologies: Array<Technology> = TECHNOLOGIES;
  locations: Array<Location> = LOCATIONS;

  @ViewChild('techmenu') techMenu: MatMenu;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterOptionsComponent);

    // TODO => to do backendu bedzie przydatne
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.techMenu._allItems);
    // this.techMenu.addItem(document.getElementById('button1'));
    // const menu = document.getElementById('more-technologies');
    // const button = document.getElementById('button1');
    // menu.appendChild(button);
    // console.log(button);
  }
}

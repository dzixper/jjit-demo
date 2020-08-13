import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterOptionsComponent } from './filter-options/filter-options.component';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  technologies: Array<object> = [
    {name: 'All', icon: 'all'},
    {name: 'JS', icon: ''},
    {name: 'HTML', icon: ''},
    {name: 'PHP', icon: ''},
    {name: 'Ruby', icon: ''},
    {name: 'Python', icon: ''},
    {name: 'Java', icon: ''},
    {name: '.Net', icon: ''},
    {name: 'Scala', icon: ''},
    {name: 'C', icon: ''},
    {name: 'Mobile', icon: ''},
    {name: 'Testing', icon: ''},
    {name: 'DevOps', icon: ''},
    {name: 'UX/UI', icon: ''},
    {name: 'PM', icon: ''},
    {name: 'Game', icon: ''},
    {name: 'Analytics', icon: ''},
    {name: 'Security', icon: ''},
    {name: 'Data', icon: ''},
    {name: 'Go', icon: ''},
    {name: 'SAP', icon: ''},
    {name: 'Support', icon: ''},
    {name: 'Other', icon: ''}
  ];

  locations: Array<object> = [
    {name: 'Warszawa', top: true},
    {name: 'Kraków', top: true},
    {name: 'Wrocław', top: true},
    {name: 'Poznań', top: true},
    {name: 'Trójmiasto', top: true},
    {name: 'Śląsk', top: true},
    {name: 'Białystok', top: false},
    {name: 'Bielsko-Biała', top: false},
    {name: 'Bydgoszcz', top: false},
    {name: 'Częstochowa', top: false},
    {name: 'Kielce', top: false},
    {name: 'Lublin', top: false},
    {name: 'Łódź', top: false},
    {name: 'Olsztyn', top: false},
    {name: 'Opole', top: false},
    {name: 'Toruń', top: false},
    {name: 'Rzeszów', top: false},
    {name: 'Szczecin', top: false},
    {name: 'Zielona Góra', top: false}
  ];

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterOptionsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}

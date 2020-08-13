import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss']
})
export class FilterOptionsComponent implements OnInit {

  levels: Array<string> = [
    'All',
    'Junior',
    'Mid',
    'Senior'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

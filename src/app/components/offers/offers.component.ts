import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {

  sortOptions: Array<string> = ['latest', 'highest salary', 'lowest salary'];
  selectedOption = 'latest';

  constructor() {}

  ngOnInit(): void {
  }


}

import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../shared/models/offer.model';

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
    // this.sortit(this.selectedOption, this.offers);
  }

  sortit(prop: string, offers: Array<Offer>): void {
    this.selectedOption = prop;
    offers.sort((a, b) => {
      switch (prop) {
        case 'latest':
          return a.timePosted < b.timePosted ? 1 : -1;
        case 'lowest salary':
          if (!('salary' in a)) {
            return 1;
          }
          if (!('salary' in b)) {
            return -1;
          }
          return a.salary[0] > b.salary[0] ? 1 : a.salary[0] === b.salary[0] ? 0 : -1;
        case 'highest salary':
          if (!('salary' in a)) {
            return 1;
          }
          if (!('salary' in b)) {
            return -1;
          }
          return a.salary[0] > b.salary[0] ? -1 : a.salary[0] === b.salary[0] ? 0 : 1;
      }
    });
  }
}

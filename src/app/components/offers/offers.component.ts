import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../shared/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  today = new Date();
  offers: Array<Offer>;
  sortOptions: Array<string> = ['latest', 'highest salary', 'lowest salary'];

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offers = this.offersService.getOffers(); // TODO => tu jest lipa
    this.sortit('latest');
  }

  setNewDate(date: number): Date {
    return new Date(date);
  }

  sortit(prop: string): void {
    // TODO => tutaj lipa bo inaczej nie działa
    this.offers.forEach((value) => {
      if (!('salary' in value)) {
        value.salary = [0, 0, '0'];
      }
    });

    // filter

    this.offers.sort((a, b) => {
      if (!('salary' in a)) {
        return -1;
      }
      switch (prop) {
        case 'latest':
          return a.timePosted > b.timePosted ? 1 : -1;
        case 'lowest salary':
          return a.salary[0] > b.salary[0]
            ? 1
            : a.salary[0] === b.salary[0]
            ? 0
            : -1;
        case 'highest salary':
          return a.salary[0] > b.salary[0]
            ? -1
            : a.salary[0] === b.salary[0]
            ? 0
            : 1;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../shared/models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  today = new Date();
  offers: Array<Offer>;
  sortOptions: Array<string> = ['latest', 'highest salary', 'lowest salary'];
  selectedOption = 'latest';

  logg(param: any): void {
    console.log(param);
  }

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offers = this.offersService.getOffers();
    this.offersService.addOffer(
      'Mati',
      'Genius',
      'Tczew',
      false,
      ['ez', 'fajnie jest', 'gbs'],
      new Date('04 April 2019'),
      [300, 600, 'PLN']
    );
    this.sortit(this.selectedOption, this.offers);
  }

  setNewDate(date: number): Date {
    return new Date(date);
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
          return a.salary[0] > b.salary[0]
            ? 1
            : a.salary[0] === b.salary[0]
            ? 0
            : -1;
        case 'highest salary':
          if (!('salary' in a)) {
            return 1;
          }
          if (!('salary' in b)) {
            return -1;
          }
          return a.salary[0] > b.salary[0]
            ? -1
            : a.salary[0] === b.salary[0]
            ? 0
            : 1;
      }
    });
  }
}

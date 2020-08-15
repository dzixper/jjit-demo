import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Offer } from '../../../shared/models/offer.model';
import { OffersService } from '../../../services/offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers-content',
  templateUrl: './offers-content.component.html',
  styleUrls: ['./offers-content.component.scss'],
})
export class OffersContentComponent implements OnChanges, OnInit, OnDestroy {
  today = new Date();
  offers: Array<Offer> = this.offersService.getOffers('all');
  @Input() selectedOption: string;
  subscriptionHandler: any;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptionHandler = this.router.events.subscribe(() => {
      if (this.route.snapshot.queryParams['tab'] === 'with-salary') {
        this.offers = this.offersService.getOffers('with-salary');
      } else {
        this.offers = this.offersService.getOffers('all');
      }
    });
    // this.offersService.addOffer(
    //   'mati',
    //   'mati',
    //   'Chwaszczyno',
    //   false,
    //   ['masno ni'],
    //   new Date('08 15 2020 18:50'),
    //   [300, 600, 'EUR']
    // );
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortit(changes.selectedOption.currentValue, this.offers);
  }

  setNewDate(date: number): Date {
    return new Date(date);
  }

  dateStyling(date: Date): string {
    return this.isNew(date) ? 'New' : this.offerDaysAfterPosted(date) + 'd ago';
  }

  offerDaysAfterPosted(date: Date): string {
    return (
      (this.today.getTime() - date.getTime()) /
      (1000 * 3600 * 24)
    ).toFixed(0);
  }

  isNew(date: Date): boolean {
    return this.offerDaysAfterPosted(date) === '0';
  }

  salaryStyling(salary: [number, number, string]): string {
    return (salary[0] + ' - ' + salary[1] + ' ' + salary[2]).replace(
      /([0-9]{3}\ )/g,
      ' $1'
    );
  }

  sortit(prop: string, offers: Array<Offer>): void {
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

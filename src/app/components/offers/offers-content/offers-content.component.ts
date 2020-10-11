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
import { TECHNOLOGIES } from '../../../shared/technologies';

@Component({
  selector: 'app-offers-content',
  templateUrl: './offers-content.component.html',
  styleUrls: ['./offers-content.component.scss'],
})
export class OffersContentComponent implements OnChanges, OnInit, OnDestroy {
  today = new Date();
  offers = [];
  allOffers = [];
  @Input() selectedOption: string;
  subscriptionHandler: any;
  canShowDetails = false;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offersService.getOffers().subscribe(
      (res) => {
        this.allOffers = res;
        this.offers = res;
        this.sortOffers('latest', this.offers);
      },
      (err) => console.log(err)
    );
    this.subscriptionHandler = this.router.events.subscribe(() => {
      if (this.route.snapshot.queryParams['tab'] === 'with-salary') {
        this.offers = this.allOffers.filter(
          (offer) => offer.salary[0] !== null
        );
      } else {
        this.offers = this.allOffers;
      }
    });
  }

  findTechColor(tech: string): string {
    return TECHNOLOGIES.find(x => x.name.toLowerCase() === tech.toLowerCase()).color;
  }

  showDetails(offer: Offer): void {
    console.log(offer);
    this.offersService.setPassOffer(offer);
    this.canShowDetails = true;
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortOffers(changes.selectedOption.currentValue, this.offers);
  }

  setNewDate(date: number): Date {
    return new Date(date);
  }

  dateStyling(date: Date): string {
    return this.isNew(date) ? 'New' : this.offerDaysAfterPosted(date) + 'd ago';
  }

  offerDaysAfterPosted(date: Date): number {
    date = new Date(date);
    return Math.floor(
      (this.today.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );
  }

  isNew(date: Date): boolean {
    return this.offerDaysAfterPosted(date) <= 1;
  }

  salaryStyling(salary: [number, number], currency: string): string {
    if (salary[0] === (undefined || null) || salary[1] === (undefined || null) || currency === undefined) {
      return 'Undisclosed salary';
    }
    return (salary[0] + ' - ' + salary[1] + ' ' + currency).replace(
      /([0-9]{3} )/g,
      ' $1'
    );
  }

  sortOffers(prop: string, offers: Array<Offer>): void {
    offers.sort((a, b) => {
      switch (prop) {
        case 'latest':
          return a.timePosted < b.timePosted ? 1 : -1;
        case 'lowest salary':
          if (a.salary[0] === null) {
            return 1;
          }
          if (b.salary[0] === null) {
            return -1;
          }
          return a.salary[0] > b.salary[0]
            ? 1
            : a.salary[0] === b.salary[0]
            ? 0
            : -1;
        case 'highest salary':
          if (a.salary[0] === null) {
            return 1;
          }
          if (b.salary[0] === null) {
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

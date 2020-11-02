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
import { Subscription } from 'rxjs';
import { salaryStyling, isNew, dateStyling, findTechColor} from '../../../utils/shared-functions';

@Component({
  selector: 'app-offers-content',
  templateUrl: './offers-content.component.html',
  styleUrls: ['./offers-content.component.scss'],
})
export class OffersContentComponent implements OnChanges, OnInit, OnDestroy {
  offers = [];
  allOffers = [];
  @Input() selectedOption: string;
  subscriptionHandler: Subscription;
  canShowDetails = false;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offersService.getOffers().then(
      (res) => {
        this.allOffers = res;
        this.offers = res;
        this.sortOffers('latest', this.offers);
      },
      (err) => console.log(err)
    );
    this.subscriptionHandler = this.router.events.subscribe(() => {
      if (this.route.snapshot.queryParams.tab === 'with-salary') {
        this.offers = this.allOffers.filter(
          (offer) => offer.salary[0] !== null
        );
      } else {
        this.offers = this.allOffers;
      }
      if (this.route.snapshot.queryParams.technology !== undefined) {
        this.offers = this.offers.filter(offer => offer.mainTech.toLowerCase() === this.route.snapshot.queryParams.technology);
      }
    });
  }

  showDetails(offer: Offer): void {
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
          return a.salary[0] > b.salary[0] ? 1 : a.salary[0] === b.salary[0] ? 0 : -1;
        case 'highest salary':
          if (a.salary[0] === null) {
            return 1;
          }
          if (b.salary[0] === null) {
            return -1;
          }
          return a.salary[0] > b.salary[0] ? -1 : a.salary[0] === b.salary[0] ? 0 : 1;
      }
    });
  }

  findTechColor(mainTech: string): string {
    return findTechColor(mainTech);
  }
  salaryStyling(salary: [number, number], currency: string): string {
    return salaryStyling(salary, currency);
  }
  isNew(date: Date): boolean {
    return isNew(date);
  }
  dateStyling(date: Date): string {
    return dateStyling(date);
  }

}

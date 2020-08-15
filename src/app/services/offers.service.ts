import { Injectable } from '@angular/core';
import { Offer } from '../shared/models/offer.model';
import { OFFERS } from '../shared/offers';

@Injectable({
  providedIn: 'root',
})
export class OffersService {

  addOffer(position: string,
           company: string,
           location: string,
           remote: boolean,
           tags: Array<string> | string,
           timePosted: Date,
           salary?: [number, number, string]
           ): void {
    OFFERS.push({position, company, location, remote, salary, tags, timePosted});
  }

  getOffers(param: string): Array<Offer> {
    switch (param) {
      case 'all':
        return OFFERS;
      case 'with-salary':
        return OFFERS.filter((offer) => ('salary' in offer));
    }

  }

  constructor() {}
}

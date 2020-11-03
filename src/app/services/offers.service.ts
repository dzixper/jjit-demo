import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../shared/models/offer.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  // private PORT = 3000;
  private _offersUrl = `https://yeet-demo.herokuapp.com/api/offers`;
  // private _offersUrl = `http://localhost:${this.PORT}/api/offers`;
  private _postFormUrl = `https://yeet-demo.herokuapp.com/api/post-offer-form`;
  // private _postFormUrl = `http://localhost:${this.PORT}/api/post-offer-form`;
  private passedOffer: Offer;
  isOfferLoaded = false;
  parsedOffers: Array<Offer>;

  addOffer(offerBody: Offer): Observable<any> {
    this.isOfferLoaded = false;
    return this.http.post<any>(this._postFormUrl, offerBody);
  }

  async fetchOffers(): Promise<any> {
    this.parsedOffers = await this.http.get<any>(this._offersUrl).toPromise();
  }

  async getOffers(): Promise<any> {
    if (this.parsedOffers !== undefined) {
      return this.parsedOffers;
    } else {
      await this.fetchOffers();
      return this.parsedOffers;
    }
  }

  setPassOffer(offer: Offer): void {
    this.passedOffer = offer;
    this.router.navigate([], {queryParams: {company: offer.company, position: offer.position, tech: offer.mainTech}});
    this.isOfferLoaded = true;
  }

  getPassOffer(): Offer {
    return this.passedOffer;
  }

  constructor(private http: HttpClient, private router: Router) {}
}

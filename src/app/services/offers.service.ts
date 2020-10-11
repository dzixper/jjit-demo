import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../shared/models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private _offersUrl = 'http://localhost:3000/api/offers';
  private _postFormUrl = 'http://localhost:3000/api/post-offer-form';
  private passedOffer: Offer;
  isOfferLoaded = false;

  addOffer(offerBody: Offer): Observable<any> {
    this.isOfferLoaded = false;
    return this.http.post<any>(this._postFormUrl, offerBody);
  }

  getOffers(): Observable<any> {
    return this.http.get<any>(this._offersUrl);
  }

  setPassOffer(offer: Offer): void {
    this.passedOffer = offer;
    this.isOfferLoaded = true;
  }

  getPassOffer(): Offer {
    return this.passedOffer;
  }

  constructor(private http: HttpClient) {}
}

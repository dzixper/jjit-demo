import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private _offersUrl = 'http://localhost:3000/api/offers';

  addOffer(
    position: string,
    company: string,
    location: string,
    remote: boolean,
    tags: Array<string> | string,
    currency: string,
    timePosted: Date,
    salary?: [number, number]
  ): Observable<any> {
    // OFFERS.push({position, company, location, remote, salary, tags, timePosted});
    console.log({
      position,
      company,
      location,
      remote,
      salary,
      tags,
      timePosted,
    });
    return this.http.post<any>(this._offersUrl, {
      "position": position,
      "company": company,
      "location": location,
      "remote": remote,
      "salary": [salary[0], salary[1]],
      "currency": currency,
      "tags": tags,
      "timePosted": timePosted,
    });
  }

  getOffers(): Observable<any> {
    return this.http.get<any>(this._offersUrl);
  }

  constructor(private http: HttpClient) {}
}

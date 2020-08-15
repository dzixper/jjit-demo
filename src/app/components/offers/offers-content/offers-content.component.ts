import { Component, OnInit } from '@angular/core';
import { Offer } from '../../../shared/models/offer.model';
import { OffersService } from '../../../services/offers.service';

@Component({
  selector: 'app-offers-content',
  templateUrl: './offers-content.component.html',
  styleUrls: ['./offers-content.component.scss']
})
export class OffersContentComponent implements OnInit {

  today = new Date();
  offers: Array<Offer> = this.offersService.getOffers('all');

  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
  }

  setNewDate(date: number): Date {
    return new Date(date);
  }

  salaryStyling(salary: [number, number, string]): string {
    return (salary[0] + ' - ' + salary[1] + ' ' + salary[2]).replace(/([0-9]{3}\ )/g,' $1');
  }


}

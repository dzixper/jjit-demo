import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  adverts: Array<object> = [
    {title: 'Basic', price: 390, currency: 'PLN'},
    {title: 'Premium', price: 490, currency: 'PLN'},
    {title: 'Business', price: 790, currency: 'PLN'}
  ];

  listItems: Array<object> = [
    {text: 'Ogłoszenie na 30 dni'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

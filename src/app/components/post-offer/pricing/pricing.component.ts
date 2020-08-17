import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  basicBundle: Array<object> = [
    {text: 'Ogłoszenie na 30 dni', active: true},
    {text: 'Ogłoszenie w prasówce technologicznej', active: true},
    {text: 'Brak Customer Care', active: false},
    {text: 'Bez odświeżeń', active: false},
    {text: 'Brak promocji w Social Media', active: false},
    {text: 'Brak indywidualnego copy', active: false},
    {text: 'Brak Social Boost - płatna kampania marketingowa w social media na budżecie klienta', active: false}
  ];

  premiumBundle: Array<object> = [
    {text: 'Ogłoszenie na 30 dni', active: true},
    {text: 'Ogłoszenie w prasówce technologicznej', active: true},
    {text: 'Dedykowany opiekun Customer Care', active: true},
    {text: '1 automatyczne odświeżenie', active: true},
    {text: 'Brak promocji w Social Media', active: false},
    {text: 'Brak indywidualnego copy', active: false},
    {text: 'Brak Social Boost - płatna kampania marketingowa w social media na budżecie klienta', active: false}
  ];

  businessBundle: Array<object> = [
    {text: 'Ogłoszenie na 30 dni', active: true},
    {text: 'Ogłoszenie w prasówce technologicznej', active: true},
    {text: 'Dedykowany opiekun Customer Care', active: true},
    {text: '2 automatyczne odświeżenia', active: true},
    {text: 'Indywidualna promocja w Social Media', active: true},
    {text: 'Indywidualne copy ogłoszenia + audyt', active: true},
    {text: 'Możliwy Social Boost - płatna kampania marketingowa w social media na budżecie klienta', active: true}
  ];

  adverts: Array<object> = [
    {title: 'Basic', price: 390, currency: 'PLN', bundle: this.basicBundle},
    {title: 'Premium', price: 490, currency: 'PLN', bundle: this.premiumBundle},
    {title: 'Business', price: 790, currency: 'PLN', bundle: this.businessBundle}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

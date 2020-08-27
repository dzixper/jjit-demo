import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BUNDLES } from '../../../shared/bundles';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit, OnChanges {
  @Input() currentLanguage: string;

  postButton: string;
  bundles = new BUNDLES();
  basicBundle = this.bundles.passBundle('basic', 'EN');
  premiumBundle = this.bundles.passBundle('premium', 'EN');
  businessBundle = this.bundles.passBundle('business', 'EN');

  adverts: Array<object> = [
    { title: 'Basic', price: 390, currency: 'PLN', bundle: this.basicBundle },
    { title: 'Premium', price: 490, currency: 'PLN', bundle: this.premiumBundle },
    { title: 'Business', price: 790, currency: 'PLN', bundle: this.businessBundle }
  ];

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.postButton = this.currentLanguage === 'EN' ? 'Post a job' : 'Kup ogłoszenie';
    this.basicBundle = this.bundles.passBundle('basic', this.currentLanguage);
    this.premiumBundle = this.bundles.passBundle('premium', this.currentLanguage);
    this.businessBundle = this.bundles.passBundle('business', this.currentLanguage);
    // this.changeDetection.detectChanges();
    // console.log(this.basicBundle);

  }

}

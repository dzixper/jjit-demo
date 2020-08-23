import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  basicBundle: Array<object>;
  premiumBundle: Array<object>;
  businessBundle: Array<object>;

  adverts: Array<object> = [
    { title: 'Basic', price: 390, currency: 'PLN', bundle: this.basicBundle },
    {
      title: 'Premium',
      price: 490,
      currency: 'PLN',
      bundle: this.premiumBundle,
    },
    {
      title: 'Business',
      price: 790,
      currency: 'PLN',
      bundle: this.businessBundle,
    },
  ];

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.postButton = this.currentLanguage === 'EN' ? 'Post a job' : 'Kup ogłoszenie';
    this.basicBundle = this.bundles.passBundle('basic', 'PL');
    this.premiumBundle = this.bundles.passBundle('premium', 'PL');
    this.businessBundle = this.bundles.passBundle('business', 'PL');
    this.changeDetection.detectChanges();

  }
}

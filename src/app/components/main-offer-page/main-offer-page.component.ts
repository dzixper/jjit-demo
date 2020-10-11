import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-main-offer-page',
  templateUrl: './main-offer-page.component.html',
  styleUrls: ['./main-offer-page.component.scss']
})
export class MainOfferPageComponent implements OnInit {

  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
  }

  canShowDetails(): boolean {
    return this.offersService.isOfferLoaded;
  }

}

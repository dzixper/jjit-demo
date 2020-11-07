import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../services/offers.service';
import { Router } from '@angular/router';
import { dateStyling, salaryStyling, findTechColor, skillDescription } from '../../../utils/shared-functions';
import { Offer } from '../../../shared/models/offer.model';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  currentOffer: Offer;
  boxes = [];

  constructor(private offersService: OffersService, private router: Router) { }

  ngOnInit(): void {
    this.currentOffer = this.offersService.getPassOffer();
    this.boxes = [
      {icon: 'business', iconColor: 'rgb(255, 82, 82)', label: this.currentOffer.company, info: 'Company name', link: this.currentOffer.website},
      {icon: 'people', iconColor: 'rgb(251, 140, 0)', label: this.currentOffer.companySize, info: 'Company size'},
      {icon: 'request_page', iconColor: 'rgb(171, 71, 188)', label: this.currentOffer.contract, info: 'EMP. type'},
      {icon: 'show_chart', iconColor: 'rgb(102, 187, 106)', label: this.currentOffer.experience, info: 'EXP. lvl'},
      {icon: 'timelapse', iconColor: 'rgb(68, 138, 255)', label: dateStyling(this.currentOffer.timePosted), info: 'Added'},
    ];
  }

  unloadOffer(): void {
    this.offersService.isOfferLoaded = false;
    if (this.router.url === '/post-offer-form/verify') {
      this.router.navigateByUrl('/post-offer-form');
    } else {
      this.router.navigate([]);
    }
  }

  salaryStyling(salary: [number, number], currency: string): string {
    return salaryStyling(salary, currency).concat(' net/month');
  }
  findTechColor(tech: string): string {
    return findTechColor(tech);
  }
  dateStyling(date: Date): string {
    return dateStyling(date);
  }

  skillDescription(level: number): string {
    return skillDescription(level);
  }
}

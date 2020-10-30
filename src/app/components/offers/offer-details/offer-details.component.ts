import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../services/offers.service';
import { TECHNOLOGIES } from '../../../shared/technologies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  currentOffer: any;
  boxes = [];
  today = new Date();

  constructor(private offersService: OffersService, private router: Router) { }

  ngOnInit(): void {
    this.currentOffer = this.offersService.getPassOffer();
    this.boxes = [
      {icon: 'business', iconColor: 'rgb(255, 82, 82)', label: this.currentOffer.company, info: 'Company name', link: this.currentOffer.website},
      {icon: 'people', iconColor: 'rgb(251, 140, 0)', label: this.currentOffer.companySize, info: 'Company size'},
      {icon: 'request_page', iconColor: 'rgb(171, 71, 188)', label: this.currentOffer.contract, info: 'EMP. type'},
      {icon: 'show_chart', iconColor: 'rgb(102, 187, 106)', label: this.currentOffer.experience, info: 'EXP. lvl'},
      {icon: 'timelapse', iconColor: 'rgb(68, 138, 255)', label: this.dateStyling(this.currentOffer.timePosted), info: 'Added'},
    ];
  }

  findTechColor(tech: string): string {
    return TECHNOLOGIES.find(x => x.name.toLowerCase() === tech.toLowerCase()).color;
  }

  unloadOffer(): void {
    this.offersService.isOfferLoaded = false;
    if (this.router.url === '/post-offer-form/verify') {
      this.router.navigateByUrl('/post-offer-form');
    } else {
      this.router.navigate([]);
    }
  }

  dateStyling(date: Date): string {
    return this.isNew(date) ? 'New' : this.offerDaysAfterPosted(date) + 'd ago';
  }

  offerDaysAfterPosted(date: Date): number {
    date = new Date(date);
    return Math.floor(
      (this.today.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );
  }

  isNew(date: Date): boolean {
    return this.offerDaysAfterPosted(date) <= 1;
  }

  salaryStyling(salary: [number, number], currency: string): string {
    if (salary[0] === (undefined || null) || salary[1] === (undefined || null) || currency === (undefined || null)) {
      return 'Undisclosed salary';
    }
    return (salary[0] + ' - ' + salary[1] + ' ' + currency).replace(
      /([0-9]{3} )/g,
      ' $1'
    ).concat(' net/month');
  }

}

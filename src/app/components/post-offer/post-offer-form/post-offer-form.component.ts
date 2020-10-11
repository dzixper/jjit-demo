import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Technology } from '../../../shared/models/technology.model';
import { TECHNOLOGIES } from '../../../shared/technologies';
import { MapComponent } from '../../map/map.component';
import { Offer } from '../../../shared/models/offer.model';
import { OffersService } from '../../../services/offers.service';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.scss']
})
export class PostOfferFormComponent implements OnInit {

  stepperLabels: Array<string> = ['Create', 'Verify', 'Payment', 'Publish'];
  technologies: Array<Technology> = TECHNOLOGIES;
  companyType = '';
  industry = '';
  experience = '';
  contract = '';
  currency = '';
  city = '';
  street = '';
  tech = '';
  image = '';
  preparedBody: Offer;
  lonLat: [number, number];


  @ViewChild(MapComponent) worldMap: MapComponent;

  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
  }

  resolveLocationCall(): void {
    if (this.city) {
      this.worldMap.resolveLocation(this.city, this.street);
    }
    setTimeout(() => this.lonLat = this.worldMap.resolvedLonLat, 1400); //TODO = dac jakiegos observabla
  }

  setTech(tech: string, color: string): void {
    this.tech = tech;
    this.worldMap.tempMarker.style.backgroundImage = `url(assets/technologies/${this.weirdTechLabels(tech)}.svg)`;
    // this.worldMap.tempMarker.style.backgroundColor = `linear-gradient(to right, blue, lighten(blue, 10%))`;
    this.worldMap.tempMarker.style.backgroundColor = `${color}`;
    this.worldMap.tempMarker.style.boxShadow = `${this.worldMap.tempMarker.style.backgroundColor.replace(')', ', 0.25)').replace('rgb', 'rgba')} 0 0 0 5px`;
  }

  weirdTechLabels(tech: string): string { // TODO XD przepraszam
    tech = tech.toLowerCase();
    switch (tech) {
      case '.net': return 'net';
      case 'ux/ui': return 'ux';
      default: return tech;
    }
  }

  onSubmit(offerBody: Offer): void {
    this.preparedBody = this.prepareToSubmit(offerBody);
    this.offersService.setPassOffer(this.preparedBody);
    // this.offersService.addOffer(preparedBody).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // );
  }

  checkSalary(salaryLow: number, salaryHigh: number, currency: string): Array<any> {
    if (salaryHigh === undefined || salaryLow === undefined || currency === undefined) {
      return [undefined, undefined, undefined];
    } else {
      return [salaryLow, salaryHigh, currency];
    }
  }

  prepareToSubmit(offerBody: any): Offer {
    [offerBody.salaryLow, offerBody.salaryHigh, offerBody.currency] = this.checkSalary(offerBody.salarylow, offerBody.salaryhigh, offerBody.currency);
    offerBody.lonLat = this.lonLat;
    offerBody.salary = [offerBody.salaryLow, offerBody.salaryHigh];
    offerBody.mainTech = this.tech;
    offerBody.logo = this.image;
    delete offerBody.salarylow;
    delete offerBody.salaryhigh;
    offerBody.timePosted = new Date();
    return offerBody;
  }

  toBase64(image): void {
    if (image) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(image);
    }
  }

  handleReaderLoaded(e): void {
    this.image = btoa(e.target.result);
  }


}

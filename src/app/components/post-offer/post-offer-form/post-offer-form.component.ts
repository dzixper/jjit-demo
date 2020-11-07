import { Component, OnInit, ViewChild } from '@angular/core';
import { Technology } from '../../../shared/models/technology.model';
import { TECHNOLOGIES } from '../../../shared/technologies';
import { MapComponent } from '../../map/map.component';
import { Offer } from '../../../shared/models/offer.model';
import { OffersService } from '../../../services/offers.service';
import { Router } from '@angular/router';
import { convertEveryTechnologyToGrayscale, weirdTechLabels } from '../../../utils/shared-functions';
import {skillDescription} from '../../../utils/shared-functions';

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
  tag = '';
  tags = [];
  preparedBody: Offer;
  lonLat: [number, number];


  @ViewChild(MapComponent) worldMap: MapComponent;

  constructor(private offersService: OffersService, private router: Router) { }

  ngOnInit(): void {
  }

  addTag(tag: string): void {
    if (this.tags.length >= 10 || tag.length < 1) {

    } else {
      this.tag = '';
      this.tags.push({stack: tag, level: 3});
    }
  }

  resolveLocationCall(): void {
    if (this.city) {
      this.worldMap.resolveLocation(this.city, this.street).then(res => this.lonLat = res);
    }
  }

  setTech(tech: string, color: string, id: number): void {
    convertEveryTechnologyToGrayscale(id);
    this.tech = tech;
    this.worldMap.tempMarker.style.backgroundImage = `url(assets/technologies/${weirdTechLabels(tech)}.svg)`;
    this.worldMap.tempMarker.style.backgroundColor = `${color}`;
    this.worldMap.tempMarker.style.boxShadow = `${this.worldMap.tempMarker.style.backgroundColor.replace(')', ', 0.25)').replace('rgb', 'rgba')} 0 0 0 5px`;
  }

  onSubmit(offerBody: Offer): void {
    this.preparedBody = this.prepareToSubmit(offerBody);
    this.offersService.setPassOffer(this.preparedBody);
    this.router.navigateByUrl('/post-offer-form/verify');
  }

  checkSalary(salaryLow: number, salaryHigh: number, currency: string): Array<any> {
    if (!salaryHigh || !salaryLow || !currency) {
      return [undefined, undefined, undefined];
    } else {
      return [salaryLow, salaryHigh, currency];
    }
  }

  prepareToSubmit(offerBody: any): Offer {
    [offerBody.salaryLow, offerBody.salaryHigh, offerBody.currency] =
      this.checkSalary(offerBody.salarylow, offerBody.salaryhigh, offerBody.currency);
    offerBody.lonLat = this.lonLat;
    offerBody.salary = [offerBody.salaryLow, offerBody.salaryHigh];
    offerBody.mainTech = this.tech;
    offerBody.logo = this.image;
    offerBody.tags = this.tags;
    offerBody.timePosted = new Date();
    delete offerBody.salarylow;
    delete offerBody.salaryhigh;
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

  skillDescription(skill: number): string {
    return skillDescription(skill);
  }

}

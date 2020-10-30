import { Component, OnInit, ViewChild } from '@angular/core';
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
  tag = '';
  tags = [];
  preparedBody: Offer;
  lonLat: [number, number];


  @ViewChild(MapComponent) worldMap: MapComponent;

  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
  }

  addTag(tag: string): void {
    if (this.tags.length >= 10 || tag.length < 1) {

    } else {
      this.tag = '';
      this.tags.push({content: tag, skill: 3});
    }
  }

  resolveLocationCall(): void {
    if (this.city) {
      this.worldMap.resolveLocation(this.city, this.street).then(res => this.lonLat = res);
    }
  }

  setTech(tech: string, color: string, id: number): void {
    this.convertEveryTechnologyToGrayscale(id);
    this.tech = tech;
    this.worldMap.tempMarker.style.backgroundImage = `url(assets/technologies/${this.weirdTechLabels(tech)}.svg)`;
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
    // this.router.navigateByUrl('/post-offer-form/verify');
  }

  convertEveryTechnologyToGrayscale(id: number): void {
    for (let i = 1; i < document.querySelectorAll('.technology').length; i++) {
      const button = document.getElementById('button' + i);
      if (id === i) {
        button.style.filter = 'grayscale(0%)';
      } else {
        button.style.filter = 'grayscale(100%)';
      }
    }
  }

  checkSalary(salaryLow: number, salaryHigh: number, currency: string): Array<any> {
    if (salaryHigh === undefined || salaryLow === undefined || currency === undefined) {
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

  skillDescription(skill: number): string {
    switch (skill) {
      case 1: return 'Nice to have';
      case 2: return 'Junior';
      case 3: return 'Regular';
      case 4: return 'Advanced';
      case 5: return 'Master';
    }
  }


}

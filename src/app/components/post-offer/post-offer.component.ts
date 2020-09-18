import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-offer',
  templateUrl: './post-offer.component.html',
  styleUrls: ['./post-offer.component.scss'],
})
export class PostOfferComponent implements OnInit {
  quote: string;
  pricingHeader: string;
  author: string;
  currentLanguage: string;

  constructor() {}

  ngOnInit(): void {
    this.setLanguage('EN');
  }

  setLanguage(lang: string): void {
    this.currentLanguage = lang;
    switch (lang) {
      case 'EN':
        this.quote =
          'The fast way [to warm mars] is to drop thermonuclear weapons over the poles.';
        this.author = 'Elon Musk';
        this.pricingHeader = 'Get to know job ads on Tylko Tu DołąCZ';
        break;
      case 'PL':
        this.quote =
          'Szybka droga [do ciepłego Marsa] to rzucić broń nukleraną nad Polakami';
        this.author = 'Elon Piżmo';
        this.pricingHeader = 'Poznaj ogłoszenia na Tylko Tu DołąCZ';
        break;
    }
  }
}

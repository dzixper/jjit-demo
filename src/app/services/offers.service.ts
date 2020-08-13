import { Injectable } from '@angular/core';
import { Offer } from '../shared/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  offers: Array<Offer> = [
    {
      position: 'Pre-Intern Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: true,
      salary: [0, 0, 'PLN'],
      tags: ['JS', 'HTML', 'CSS'],
      timePosted: new Date('08 07 2020 17:00:00 GMT'),
    },
    {
      position: 'Intern Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: true,
      salary: [2000, 2000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 20:10:00 GMT'),
    },
    {
      position: 'Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: true,
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 20:20:00 GMT'),
    },
    {
      position: 'Baby Junior Java Developer',
      company: 'Spartez',
      location: 'Gdansk',
      remote: false,
      tags: ['Java', 'MoboDB'],
      timePosted: new Date('08 07 2020 13:30:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Spartez',
      location: 'Gdansk',
      remote: false,
      salary: [12000, 16000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 15:35:00 GMT'),
    },
    {
      position: 'Senior C# Developer',
      company: 'Intel',
      location: 'Gdansk',
      remote: true,
      salary: [17000, 21000, 'PLN'],
      tags: ['C#', 'C++'],
      timePosted: new Date('08 07 2020 16:37:00 GMT'),
    },
    {
      position: 'Senior Concrete Mixer Operator',
      company: 'Zbych-BUD',
      location: 'Kolbudy',
      remote: false,
      salary: [1680, 1720, 'PLN'],
      tags: ['Concrete', 'Shovel', 'Beer', 'Notfunny'],
      timePosted: new Date('08 07 2020 09:38:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: false,
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 15:41:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: false,
      salary: [3000, 6000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 15:43:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: false,
      salary: [3000, 6000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 03:46:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: false,
      salary: [3000, 6000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 06:51:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: false,
      salary: [3000, 6000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 07:53:00 GMT'),
    },
    {
      position: 'Senior Software Developer',
      company: 'Neoteric',
      location: 'Gdansk',
      remote: false,
      salary: [3000, 6000, 'PLN'],
      tags: ['JS', 'HTML', 'CSS', 'Angular'],
      timePosted: new Date('08 07 2020 21:54:00 GMT'),
    },
  ];

  getOffers(): Array<Offer> {
    return this.offers;
  }

  constructor() {}
}

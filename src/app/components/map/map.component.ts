import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Router } from '@angular/router';
import { TECHNOLOGIES } from '../../shared/technologies';

declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapToken =
    'pk.eyJ1IjoiZHp1bXBlciIsImEiOiJja2RwcTRndHgwMGNoMnFsaXN2cTRjOG1lIn0.s8xs15zF1SQJ6c1IScg4Zw';
  tempMarker = document.createElement('div');
  resolvedLonLat: [number, number];
  defaultLocation = [18.649, 51.9194];

  constructor(private offersService: OffersService, private router: Router) {}

  ngAfterViewInit(): void {
    this.createMap();
  }

  ngOnInit(): void {
    //this.createMap();
  }

  ngOnDestroy(): void {
    this.map.remove();
    this.map = null;
  }

  resolveLocation(city: string, street: string): void {
    setTimeout(() => {
      const searchString = `${city},${street}`;
      const apiToken = 'f242b16f170cdb';
      const url = `https://eu1.locationiq.com/v1/search.php?key=${apiToken}&q=${searchString}&format=json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const zoom = street === '' ? 5 : 13;
          const lon = data[0].lon;
          const lat = data[0].lat;
          this.changeTemporaryMarkerLocation([lon, lat]);
          this.map.flyTo({
            center: [lon, lat],
            zoom,
            essential: true,
          });
          this.resolvedLonLat = [lon, lat];
        });
    }, 0);
  }

  changeTemporaryMarkerLocation([lon, lat]:
    | Array<string>
    | Array<number>): void {
    new mapboxgl.Marker(this.tempMarker).setLngLat([lon, lat]).addTo(this.map);
  }

  initializeTempMarker(): void {
    this.tempMarker.id = 'marker';
    this.changeMarkerStyle(this.tempMarker, '#A9A9A9', 'question-mark');
    this.changeTemporaryMarkerLocation(this.defaultLocation);
  }

  weirdTechLabels(tech: string): string { // TODO XD przepraszam
    tech = tech.toLowerCase();
    switch (tech) {
      case '.net': return 'net';
      case 'ux/ui': return 'ux';
      default: return tech;
    }
  }

  changeMarkerStyle(marker: any, color: string, tech: string): void { // TODO marker: documentHTML
    marker.style.backgroundColor = color;
    marker.style.boxShadow = `${marker.style.backgroundColor.replace(')', ', 0.25)').replace('rgb', 'rgba')} 0 0 0 5px`;
    marker.style.backgroundImage = `url(assets/technologies/${this.weirdTechLabels(tech)}.svg)`;
  }

  createMap(): Promise<any> {
    mapboxgl.accessToken = this.mapToken;
    return new Promise((resolve) => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=4KUnpV6fDaFG8SEWt5jQ',
        center: this.defaultLocation,
        zoom: 5,
      });
      this.addMarkers();
      resolve();
    });
  }

  addMarkers(): void {
    if (this.router.url === '/post-offer-form') {
      this.initializeTempMarker();
      return;
    }
    this.offersService.getOffers().subscribe((res) => {
      for (const offer of res) {
        const marker = document.createElement('a'); // TODO => tutaj odnosnik do oferty
        marker.id = 'marker';
        marker.onclick = () => {
          this.map.flyTo({
            center: offer.lonLat,
            zoom: 10,
            essential: true,
          });
          this.offersService.setPassOffer(offer);
          this.offersService.isOfferLoaded = true;
        };
        const offerTech = TECHNOLOGIES.find(x => x.name.toLowerCase() === offer.mainTech.toLowerCase());
        this.changeMarkerStyle(marker, offerTech.color, offer.mainTech);
        new mapboxgl.Marker(marker).setLngLat(offer.lonLat).addTo(this.map);
      }
    });
  }
}

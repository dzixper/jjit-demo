import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TECHNOLOGIES } from '../../shared/technologies';
import { Subscription } from 'rxjs';
import { weirdTechLabels } from '../../utils/shared-functions';

declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapToken =
    'pk.eyJ1IjoiZHp1bXBlciIsImEiOiJja2RwcTRndHgwMGNoMnFsaXN2cTRjOG1lIn0.s8xs15zF1SQJ6c1IScg4Zw';
  tempMarker = document.createElement('div');
  resolvedLonLat: [number, number];
  defaultLocation = [18.649, 51.9194];
  subscriptionHandler: Subscription;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.createMap();
    this.subscriptionHandler = this.router.events.subscribe(() => {
      if (this.route.snapshot.queryParams.company !== undefined) {
        const offer = this.offersService.getPassOffer();
        this.map.flyTo({
          center: offer.lonLat,
          zoom: 13,
          essential: true,
        });
      } else if (this.route.snapshot.queryParams.technology !== undefined) {
        this.addMarkers(this.route.snapshot.queryParams.technology);
      } else {
        this.addMarkers();
        this.map.flyTo({
          center: this.defaultLocation,
          zoom: 5,
          essential: true,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  async resolveLocation(city: string, street: string): Promise<any> {
      const searchString = `${city},${street}`;
      const apiToken = 'f242b16f170cdb';
      const url = `https://eu1.locationiq.com/v1/search.php?key=${apiToken}&q=${searchString}&format=json`;
      await fetch(url)
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
      return this.resolvedLonLat;
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

  changeMarkerStyle(marker: any, color: string, tech: string): void {
    // TODO marker: documentHTML
    marker.style.backgroundColor = color;
    marker.style.boxShadow = `${marker.style.backgroundColor
      .replace(')', ', 0.25)')
      .replace('rgb', 'rgba')} 0 0 0 5px`;
    marker.style.backgroundImage = `url(assets/technologies/${weirdTechLabels(tech)}.svg)`;
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
        maxZoom: 13,
        minZoom: 4,
      });
      this.addMarkers();
      resolve();
    });
  }

  clearAllMarkers(): void {
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => marker.remove());
  }

  addMarkers(tech?: string): Promise<any> {
    if (this.router.url === '/post-offer-form') {
      this.initializeTempMarker();
      return;
    }
    this.offersService.getOffers().then((res) => {
      this.clearAllMarkers();
      for (const offer of res) {
        if (tech && offer.mainTech.toLowerCase() !== tech) {
          continue;
        }
        const marker = document.createElement('a');
        marker.className = 'marker';
        marker.onclick = () => {
          this.map.flyTo({
            center: offer.lonLat,
            zoom: 10,
            essential: true,
          });
          this.offersService.setPassOffer(offer);
          this.offersService.isOfferLoaded = true;
        };
        const offerTech = TECHNOLOGIES.find(
          (x) => x.name.toLowerCase() === offer.mainTech.toLowerCase()
        );
        this.changeMarkerStyle(marker, offerTech.color, offer.mainTech);
        new mapboxgl.Marker(marker).setLngLat(offer.lonLat).addTo(this.map);
      }
    });
  }
}

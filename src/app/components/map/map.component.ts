import { AfterViewInit, Component, OnDestroy } from '@angular/core';


declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  map: any;
  mapToken = 'pk.eyJ1IjoiZHp1bXBlciIsImEiOiJja2RwcTRndHgwMGNoMnFsaXN2cTRjOG1lIn0.s8xs15zF1SQJ6c1IScg4Zw';
  tempMarker = document.createElement('a');

  constructor() {}

  ngAfterViewInit(): void {
    this.createMap();
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  resolveLocation(city: string, street: string): void {
    setTimeout(() => {
      const searchString = `${city},${street}`;
      const apiToken = 'f242b16f170cdb';
      const url = `https://eu1.locationiq.com/v1/search.php?key=${apiToken}&q=${searchString}&format=json`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const zoom = street === '' ? 5 : 13;
          const lon = data[0].lon;
          const lat = data[0].lat;
          this.changeTemporaryMarkerLocation(lon, lat);
          this.map.flyTo({
            center: [lon, lat],
            zoom,
            essential: true
          });
        });
    }, 1000);
  }

  changeTemporaryMarkerLocation(lon: string, lat: string): void {
    this.tempMarker.id = 'marker';
    this.tempMarker.href = '#';
    new mapboxgl.Marker(this.tempMarker).setLngLat([lon, lat]).addTo(this.map);
  }

  createMap(): Promise<any> {
    return new Promise(resolve => setTimeout(() => {
      mapboxgl.accessToken = this.mapToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=4KUnpV6fDaFG8SEWt5jQ',
        center: [18.649, 51.9194],
        zoom: 5,
      });
      resolve();
    }));
  }
}

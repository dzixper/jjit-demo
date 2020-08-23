import { AfterViewInit, Component, OnDestroy } from '@angular/core';

declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  map: any;

  constructor() {}

  ngAfterViewInit(): void {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZHp1bXBlciIsImEiOiJja2RwcTRndHgwMGNoMnFsaXN2cTRjOG1lIn0.s8xs15zF1SQJ6c1IScg4Zw';
    // let map = new mapboxgl.Map({
    //   container: 'map',
    //   style:
    //     'https://api.maptiler.com/maps/streets/style.json?key=4KUnpV6fDaFG8SEWt5jQ',
    //   center: [19.1451, 51.9194],
    //   zoom: 5,
    // });
    const warsaw = [21.017532, 52.237049];
    const gdansk = [18.64637, 54.35205];
    const poznan = [16.925167, 52.406376];
    this.map = new mapboxgl.Map({
      container: 'map',
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=4KUnpV6fDaFG8SEWt5jQ',
      center: [18.649, 51.9194],
      zoom: 5,
    });

    // create DOM element for the marker
    const el = document.createElement('a');
    el.id = 'marker';
    el.href = '#';

    const el2 = document.createElement('a');
    el2.id = 'marker';
    el2.href = '#';

    const el3 = document.createElement('a');
    el3.id = 'marker';
    el3.href = '#';

    // create the marker
    new mapboxgl.Marker(el).setLngLat(warsaw).addTo(this.map);

    new mapboxgl.Marker(el3).setLngLat(poznan).addTo(this.map);

    new mapboxgl.Marker(el2).setLngLat(gdansk).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map.remove();
  }
}

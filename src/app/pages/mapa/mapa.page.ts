import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo');
    geo = geo.substring(4);
    geo = geo.split(',');

    this.latitud = Number(geo[0]);
    this.longitud = Number(geo[1]);
    // console.log(geo);
    // console.log(this.latitud );
    // console.log(this.longitud );
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2tvbWFscmFtIiwiYSI6ImNsM2dmc2cyZjAwZXYzZGs0ZjRzYmgxdTEifQ.urGL3g7hJ71B1kYwTHpn8w';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [ this.longitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('load', () => {

      //resize para que aparezca siempre del tamañod e la pantalla
      map.resize();

      //marker
      new mapboxgl.Marker()
        .setLngLat([this.longitud, this.latitud])
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          // eslint-disable-next-line quote-props
          'id': 'add-3d-buildings',
          // eslint-disable-next-line quote-props
          'source': 'composite',
          'source-layer': 'building',
          // eslint-disable-next-line quote-props
          'filter': ['==', 'extrude', 'true'],
          // eslint-disable-next-line quote-props
          'type': 'fill-extrusion',
          // eslint-disable-next-line quote-props
          'minzoom': 15,
          // eslint-disable-next-line quote-props
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }

}

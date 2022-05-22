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
  constructor( private route: ActivatedRoute) { }

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
    const  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}

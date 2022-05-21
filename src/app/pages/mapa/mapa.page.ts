import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  latitud: number;
  longitud: number;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo');
    geo = geo.substring(4);
    geo = geo.split(',');

    this.latitud = Number(geo[0]);
    this.longitud = Number(geo[1]);
    console.log(geo);
    console.log(this.latitud );
    console.log(this.longitud );
  }

}

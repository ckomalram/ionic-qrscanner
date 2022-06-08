import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(private barScanner: BarcodeScanner, private datalocalservice: DatalocalService) {}

  ionViewDidEnter(){
    //console.log('ionViewDidEnter');
  }
  ionViewWillEnter(){
    //console.log('ionViewDidEnter');
    // this.scanCode();
  }

  ionViewDidLeave(){
    //console.log('ionViewDidLeave');
  }

  scanCode(){
   console.log('scanCode');
    this.barScanner.scan().then(barcodeData => {
     // console.log('Barcode data', barcodeData);
     console.log('Proceso de scan');
      if ( !barcodeData.cancelled) {
        console.log('entro a scan');
        this.datalocalservice.guardarRegistro(barcodeData.format, barcodeData.text);
      }
     }).catch(err => {
      console.log('Error scan');
       //  console.log('Error', err);
         //Solo para cuando estamos probando en la pc, pq no cuenta con cordova /capacitor
         //para qr http
        //  this.datalocalservice.guardarRegistro('QRCode', 'https://spectergroup.godaddysites.com/');
        //para qr de mapa
         this.datalocalservice.guardarRegistro('QRCode', 'geo:8.9021822,-79.6838868');
     });
  }

}

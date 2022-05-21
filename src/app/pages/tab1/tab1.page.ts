import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private barScanner: BarcodeScanner) {}

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }
  ionViewWillEnter(){
    console.log('ionViewDidEnter');
    this.scanCode();
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }

  scanCode(){
    console.log('scanCode');
    this.barScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}

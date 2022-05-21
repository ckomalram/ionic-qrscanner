import { Injectable } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  guardados: Registro[] = [];

  constructor(private storage: Storage , private navCtrl: NavController, private iab: InAppBrowser) {
    this.init();
    this.cargarStorage();
  }

  async init() {
    await this.storage.create();
    // console.log('instancia creada');
  }

  async cargarStorage(){
    this.storage.get('registros')
    .then( registros => this.guardados = registros  || []);
  }

  async guardarRegistro(format: string, text: string) {

    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    //console.log(this.guardados);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro){
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        //abrir nav web por defecto
       this.iab.create(registro.text, '_system');
        break;
      default:
        break;
    }
  }
}

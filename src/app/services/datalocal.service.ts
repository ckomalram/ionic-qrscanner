import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  guardados: Registro[] = [];

  constructor(private storage: Storage) {
    this.init();
    this.storage.get('registros')
    .then( registros => this.guardados = registros  || []);
  }

  async init() {
    await this.storage.create();
    // console.log('instancia creada');
  }

  guardarRegistro(format: string, text: string) {
    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    //console.log(this.guardados);

    this.storage.set('registros', this.guardados);
  }
}

import { Component } from '@angular/core';
import { DatalocalService } from '../../services/datalocal.service';
import { Registro } from '../../models/registro.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public datalocalservice: DatalocalService) {}

  enviarCorreo(){
    //console.log('Enviando correo');
    this.datalocalservice.enviarCorreo();
  }

  abrirRegistro(registro){
   // console.log('registro',registro);
   this.datalocalservice.abrirRegistro(registro);
  }

}

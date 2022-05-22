import { Injectable } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../models/registro.model';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';



@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  guardados: Registro[] = [];

  constructor(private storage: Storage, private navCtrl: NavController, private iab: InAppBrowser,
    private file: File,private emailComposer: EmailComposer
  ) {
    this.init();
    this.cargarStorage();
  }

  async init() {
    await this.storage.create();
    // console.log('instancia creada');
  }

  async cargarStorage() {
    this.storage.get('registros')
      .then(registros => this.guardados = registros || []);
  }

  async guardarRegistro(format: string, text: string) {

    // await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    //console.log(this.guardados);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);

  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        //abrir nav web por defecto
        this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        //abrir mapa
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;
      default:
        break;
    }
  }

  enviarCorreo() {
    const arrTmp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    arrTmp.push(titulos);

    this.guardados.forEach(registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.creado}, ${registro.text.replace(',', ' ')}\n`;

      arrTmp.push(linea);
    });
    this.crearArchivoFisico(arrTmp.join(''));
    // console.log(arrTmp.join(''));
  }

  crearArchivoFisico(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      .then(existe => {
        console.log('existe archivo?', existe);
         this.escribirEnArchivo(text);
      })
      .catch(error => {
        this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
        .then(creado => this.escribirEnArchivo(text))
        .catch(error2 => console.log('No se pudo crear el archivo => ', error2));
      });
  }

  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    // console.log('Archivo Creado!! ');
    // console.log(this.file.dataDirectory +  'registros.csv ');

    const archivo = `${this.file.dataDirectory}registros.csv`;
    const email = {
      to: 'glaw14@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Prueba-Backup-QR-Scanner',
      body: 'Prueba de ionic 6 con udemy-fernandoBarrera',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }
}

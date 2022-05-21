export class Registro {
  format: string;
  text: string;
  type: string;
  icon: string;
  creado: Date;

  constructor(format: string, text: string) {
    this.format = format;
    this.text = text;
    this.creado = new Date();
    this.determinarTipo();
  }

  private determinarTipo() {
    const inicioTexto = this.text.substring(0, 4);
    //console.log('Tipo', inicioTexto);

    switch (inicioTexto) {
      case 'http':
        this.type = 'http';
        this.icon = 'globe';
        break;
      case 'geo:':
        this.type = 'geo';
        this.icon = 'pin';
        break;
      // case 'http':
      //   this.type = 'http';
      //   this.icon = 'globe';
      //   break;
      // case 'http':
      //   this.type = 'http';
      //   this.icon = 'globe';
        break;

      default:
        this.type = 'No reconocido';
        this.icon= 'create';
        break;
    }
  }
}

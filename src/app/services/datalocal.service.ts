import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  guardados: Registro[] = [];

  constructor() { }
}

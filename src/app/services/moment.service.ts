import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
@Injectable({
  providedIn: 'root',
})
export class MomentService {
  constructor() {
    moment.locale('es');
  }
  obternerSoloFecha(date: any): any {
    return moment(date).format('DD-MMMM-YYYY');
  }
  obternerFecha7DiasAtras(): any {
    return moment().subtract(7, 'days');
  }
  obternerFecha1MesAtras(): any {
    return moment().subtract(1, 'months');
  }
  obternerFecha1AnnoAtras(): any {
    return moment().subtract(1, 'years');
  }

  estaEnRango(fecha: any, fechaInicio: any) {
    return moment(fecha).isBetween(fechaInicio, undefined);
  }
  esFechaActual(fecha: any) {
    return moment().isSame(fecha);
  }
}

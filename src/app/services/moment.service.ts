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
}
